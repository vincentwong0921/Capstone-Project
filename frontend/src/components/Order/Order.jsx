import './Order.css'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getAllOrders, getMyOrders } from '../../store/order';
import OrderDetail from './OrderDetail';

function Order() {
    const dispatch = useDispatch()
    const [ isloaded, setIsLoaded ] = useState(false)
    const [ selectedStatus, setSelectedStatus ] = useState('All Orders')
    const userRole = useSelector(state => state.session.user.role)
    const orderList = Object.values(useSelector(state => state.order))
    const statusList = ['All Orders', ...new Set(orderList.map(order => order.status))]
    const statusClick = status => setSelectedStatus(status)

    let detailsToRender
    if(selectedStatus === 'All Orders') {
        detailsToRender = orderList
    } else {
        detailsToRender = orderList.filter(order => order.status === selectedStatus)
    }

    useEffect(() => {
        const fetch = async () => {
            if(userRole === 'Admin'){
                await dispatch(getAllOrders())
            } else {
                await dispatch(getMyOrders())
            }
            setIsLoaded(true)
        }
        fetch()
    }, [dispatch, userRole])

    if(!isloaded) return <>Loading...</>

    return (
        <>
            <div className='Banner'></div>
            <div className='Orders'>
                {userRole === 'Admin' ? <h1>Manage Orders</h1> : <h1>My Orders</h1>}
            </div>
            <div className='OrderContainer'>
                <div className='StatusContainer'>
                    {statusList && statusList.map(status => (
                        <li key={status} onClick={() => statusClick(status)} className={selectedStatus === status ? 'SelectedStatus': 'Status'}>{status}</li>
                    ))}
                </div>
                <div className='DetailsContainer'>
                    <OrderDetail detailsToRender={detailsToRender}/>
                </div>
            </div>
        </>
    )
}


export default Order
