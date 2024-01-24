
import { Outlet, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { DBContext } from './DBProvider';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  const context = useContext(DBContext)

  return (
    <>
      <div className='main'>
        <section className='sidebar'>
          <div className='sidebar-top'>
            <NavLink
                to={"home"}
                className='nav-link'
              >
                <div className='btn' id='btn-1'>
                  <p>HOME</p>
                </div>
            </NavLink>
             <NavLink
                to={"ciferRU"}
                className='nav-link'
              >
              <div className='btn' id='btn-2'>
                <p>RUSSIA</p>
              </div>
            </NavLink>
            <NavLink
                to={"ciferKor"}
                className='nav-link'
              >
              <div className='btn' id="btn-2">
                <p>KOREA</p> 
              </div> 
            </NavLink>
          </div>

          <div className={`sidebar-bottom ${context.connected ? "connected" : ""}`}>
            <span>{context.connected ? "DB接続中" : "DB未接続"}</span>
          </div>
  
        </section>
        <section className='right'>
          <Outlet />
          <ToastContainer />
        </section>
      </div>
    </>
  );
}

export default App;
