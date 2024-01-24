import React from 'react'
import { useContext, useState } from 'react'
import { DBContext } from '../DBProvider'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Home = () => {
  const context = useContext(DBContext)
  const [loading, setLoading] = useState(false)

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
          position: "bottom-right"
        });
        context.setConnected(true)
      }

      await loadData() //あとで消すかも!

    }catch(e){
      toast.error("DBに接続できませんでした。DBが正常に起動しているか確認してください。", {
        position: "bottom-right"
      });
    }finally {
      setLoading(false)
    }
  }

  // const showExpired = () => {
  //   const selected = context.data.filter(ele => {
  //     return ele._doc.status === "注销"
  //   })

  //   return selected
  // }

  const extract = async () => {
    await window.myAPI.extract()
  }

  const extractKor = async () => {
    await window.myAPI.extractKor()
  }
  
  return (
    <>
       {
        context.connected ? (
          <>
            <button onClick={extract}>extract</button>
            <button onClick={extractKor}>extractKor</button>
          </>

          // context.data.length > 0 ? (
          //   <>
          //   <div className='home-data'>       
            
          //     <table>
          //         <tr>
          //           <th>NO.</th><th>COUNTRY</th><th>CATEGORY</th><th>CHINA REG. NO.</th>
          //           <th>OVERSEAS REG. NO.</th><th>NAME</th><th>ADDRESS</th>
          //           <th>REG.DATE</th><th>REG.EXPIRY</th><th>STATE</th>
          //         </tr>
                
          //         {
          //           context.data.map(ele => {
          //             return (
          //               <>
          //                 <tr>
          //                   <td>{ele._doc.orderNum}</td><td>{ele._doc.country}</td><td>{ele._doc.category}</td>
          //                   <td>{ele._doc.chinaRegNo}</td><td>{ele._doc.overseasRegNo}</td><td>{ele._doc.name}</td>
          //                   <td>{ele._doc.address}</td><td>{ele._doc.regDate}</td><td>{ele._doc.regExpiryDate}</td><td>{ele._doc.status}</td>
          //                 </tr>
          //               </>
          //             )
          //           })
          //         }
          //     </table>
          //   </div> 
          // </>
          // ) : (
          //   <>
          //     <div className='home-container'>
          //     <div id='notConnected'>
          //           <p>DB上にデータが存在していません.</p>
          //           <p>左側ナビゲーションボタンから対象の国を選択のうえ抽出を開始してください.</p>
          //       </div>
          //     </div>
          //   </>
          // )
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

export default Home