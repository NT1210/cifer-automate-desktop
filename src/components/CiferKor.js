import React from 'react'
import { useContext, useState, useLayoutEffect } from 'react'
import { DBContext } from '../DBProvider'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CiferKor = () => {
  const context = useContext(DBContext)
  const [loading, setLoading] = useState(false)
  const [korData, setKorData] = useState([])

  useLayoutEffect(() => {
    setKorData(selectKor())
  }, [loading])

  const loadData = async () => {
    try{
      let loadedData = await window.myAPI.loadData()
      context.setData(loadedData)
    }catch(e){
      throw e
    }
  }

  const connectDB = async () => {
    setLoading(true)
    try{
      let res = await window.myAPI.connectDB()
      if(res === "connected") {
        toast.success("DBに接続しました。", {
          position: "bottom-right",
          theme: "dark",
          autoClose: 3000
        });
        context.setConnected(true)
      }

      await loadData()

    }catch(e){
      toast.error("DBに接続できませんでした。DBが正常に起動しているか確認してください。", {
        position: "bottom-right",
        theme: "dark",
        autoClose: 3000
      });
    }finally {
      setLoading(false)
    }
  }

  const selectKor = () =>{
    const korArr = context.data.filter(ele => {
      return ele._doc.country === "韩国"
    })

    const sortedKorArr = korArr.sort((a,b) => {
      return a._doc.orderNum < b._doc.orderNum ? -1 : 1
    })
    
    return sortedKorArr
  }

  const handleChange = (e) => {

    console.log(e.target.value)
    if(e.target.value === ""){
      setKorData(selectKor())
      return //これめっちゃ大事、なぜ...
    }

    const searchedArr = korData.filter(ele => {
      return ( (ele._doc.name).toLowerCase() ).includes( (e.target.value).toLowerCase() )
    })

    if(searchedArr.length > 0){
      setKorData(searchedArr)
    }else{
      setKorData(selectKor())
      return
    }   
}
  
  return (
    <>
       {
        context.connected ? (
          korData.length ? (
            <>
            <div className='home-data'>
              <div>
                <h3>対象国：韓国</h3>
              </div>
              <div className='search'>
                <p><span id="keyword">キーワード</span>を入力して絞り込む:</p>
                <input type='text' onChange={handleChange}/>
              </div>
              
              <table>
                  <thead>
                    <tr>
                      <th>NO.</th><th>COUNTRY</th><th>CATEGORY</th><th>CHINA REG. NO.</th>
                      <th>OVERSEAS REG. NO.</th><th>NAME</th><th>ADDRESS</th>
                      <th>REG.DATE</th><th>REG.EXPIRY</th><th>STATE</th>
                    </tr>
                  </thead>
                
                  {
                    korData.map((ele, index) => {
                      return (
                        <>
                          <tbody>
                            <tr>
                              <td>{ele._doc.orderNum}</td><td>{ele._doc.country}</td><td>{ele._doc.category}</td>
                              <td>{ele._doc.chinaRegNo}</td><td>{ele._doc.overseasRegNo}</td><td>{ele._doc.name}</td>
                              <td>{ele._doc.address}</td><td>{ele._doc.regDate}</td><td>{ele._doc.regExpiryDate}</td><td>{ele._doc.status}</td>
                            </tr>
                          </tbody>
                        </>
                      )
                    })
                  }
              </table>
            </div> 
          </>
          ) : (
            <>
              <div className='home-container'>
              <div id='notConnected'>
                    <p>DB上にデータが存在していません.</p>
                    <p>左側ナビゲーション【HOME】ボタンから対象の国を選択のうえ抽出を開始してください.</p>
                </div>
              </div>
            </>
          )
        ) : (
          <>
            <div className='home-container'>
                  <div id='notConnected'>
                    <p>アプリケーションがDBに接続されていません.</p>

                    <button id='home-button' onClick={connectDB} type='button' disabled={loading}　className={loading ? "disable": ""}>
                      <span id='home-button-txt'>{loading ? "接続試行中..." : "接続する"}</span>
                    </button>
                </div>
            </div>
          </>
        )
       }
    </>
 
  )
}

export default CiferKor