import React from 'react'
import { useContext, useState } from 'react'
import { DBContext } from '../DBProvider'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Home = () => {
  const context = useContext(DBContext)
  const [loading, setLoading] = useState(false)
  const [extractLoading, setExtractLoading] = useState(false)
  const [extractKorLoading, setExtractKorLoading] = useState(false)

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

      await loadData() //あとで消すかも!

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

  const extract = async () => {
    setExtractLoading(true)
    
    try{
      const res = await window.myAPI.extract()
      await loadData()

      if(res === "success"){
        toast.success("抽出が完了しました。更新ファイルはデスクトップに保存されました。", {
          position: "bottom-right",
          theme: "dark",
          autoClose: 3000
      });
      }
    }catch(e){
      toast.error("エラーが発生しました。", {
        position: "bottom-right",
        theme: "dark",
        autoClose: 3000
      });
    }finally{
      setExtractLoading(false)
    }

  }

  const extractKor = async () => {
    setExtractKorLoading(true)
    
    try{
      const res = await window.myAPI.extractKor()
      await loadData()

      if(res === "success"){
        toast.success("抽出が完了しました。更新ファイルはデスクトップに保存されました。", {
          position: "bottom-right",
          theme: "dark",
          autoClose: 3000
      });
      }
    }catch(e){
      toast.error("エラーが発生しました。", {
        position: "bottom-right",
        theme: "dark",
        autoClose: 3000
      });
    }finally{
      setExtractKorLoading(false)
    }
  }

  const checkRussiaData = () => {
    const total = context.data.filter(ele => {
      return ele._doc.country === "俄罗斯"
    })

    const notExpired = total.filter(ele => {
      return ele._doc.status === "有效"
    })

    const expired = total.filter(ele => {
      return ele._doc.status === "注销" || ele._doc.status === "超期" || ele._doc.status === "暂停进口"
    })

    return [total, notExpired, expired]
  }

  const checkKoreaData = () => {
    const total = context.data.filter(ele => {
      return ele._doc.country === "韩国"
    })

    const notExpired = total.filter(ele => {
      return ele._doc.status === "有效"
    })

    const expired = total.filter(ele => {
      return ele._doc.status === "注销" || ele._doc.status === "超期" || ele._doc.status === "暂停进口"
    })

    return [total, notExpired, expired]
  }
  
  return (
    <>
       {
        context.connected ? (      
          <>
            <div className='home-data'>       
            



              <div className='column-container'>
                  <div className='russia-column'>
                      <div className='column-title'>
                      <span className="fi fi-ru"></span>
                      <h3>RUSSIA</h3>
                      </div>
                      
                      <div className='main-content'>
                        <p>TOTAL REGISTERED: {checkRussiaData()[0].length}件</p>
                        <p>VALID: {checkRussiaData()[1].length}件</p>
                        <span className='expired-red'><p>EXPIRED: {checkRussiaData()[2].length}件</p></span>
                      </div>

                      <div className='button-section'>
                        <button onClick={extract} type='button' disabled={extractLoading || extractKorLoading}>{extractLoading ? "抽出中..." : "抽出開始"}</button>
                      </div>
                  </div>

                  <div className='korea-column'>
                      <div className='column-title'>
                      <span className="fi fi-kr"></span>
                      <h3>KOREA</h3>
                      </div>

                      <div className='main-content'>
                        <p>TOTAL REGISTERED: {checkKoreaData()[0].length}件</p>
                        <p>VALID: {checkKoreaData()[1].length}件</p>
                        <span className='expired-red'><p>EXPIRED: {checkKoreaData()[2].length}件</p></span>
                      </div>

                      <div className='button-section'>
                        <button onClick={extractKor} type='button' disabled={extractLoading || extractKorLoading}>{extractKorLoading ? "抽出中..." : "抽出開始"}</button>
                      </div>
                  </div>
              </div>
            </div> 
          </>
        ) : (
          <>
            <div className='home-container'>
                  <div id='notConnected'>
                    <p>アプリケーションがDBに接続されていません.</p>

                    <button id='home-button' onClick={connectDB} type='button' disabled={loading}>
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