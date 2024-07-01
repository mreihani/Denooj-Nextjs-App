import Input from '@/app/components/shared/form/input';
import CustomLoginInput from '@/app/components/shared/form/customLoginInput';
import { UserCheckoutFormInterface } from '@/app/contracts/checkout/index';
import { ErrorMessage, Form, FormikProps, Field } from 'formik';
import Link from 'next/link';
import useOrder from '@/app/hooks/order/useOrder';
import Pagination from '@/app/components/shared/pagination/orders/pagination';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUsersOrdersByQuery } from '@/app/hooks/dashboard/getUsersOrdersByQuery';
import { getUserOrderById } from '@/app/hooks/order/getOrderById';
var moment = require('moment-jalaali');

const OrdersList = () => {

    const router = useRouter();
    const { query } = router;

    interface Orders {
        docs: any,
        totalPages: any,
        page: any
    }

    interface OrderDetail {
        order: any
    }

    let orderStatusPagination;
    if(query.status == undefined) {
        orderStatusPagination = 'all'
    } else {
        orderStatusPagination = query.status;
    }

    const [orders, setOrders] = useState<Orders>({ docs: [], totalPages: 0, page: 1 });
    const [orderDetail, setOrderDetail] = useState<OrderDetail>({order: {}});
    const [displayOrderDetailPage, setDisplayOrderDetailPage] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            let orders: Orders = { docs: [], totalPages: 0, page: 1 };
            if (query.page) {
                orders = await getUsersOrdersByQuery(query.status, Number(query.page));
            } else {
                orders = await getUsersOrdersByQuery('all', Number(1));
            }
            setOrders(orders);
        };
        fetchData();
    }, [query.page]);

    const fetchUserOrdersHandler = async(status :any) => {
        let orders: Orders = { docs: [], totalPages: 0, page: 1 };
        orders = await getUsersOrdersByQuery(status, 1);
        setOrders(orders);
    }

    const getUserOrderByIdHandler = async(id :string) => {
        let order = await getUserOrderById(id);
        setOrderDetail(order);   
        setDisplayOrderDetailPage(true);
    }

    const hideOrderDetailPage = () => {
        setDisplayOrderDetailPage(false);
    }

    return (
       <>
            <div className="panel_header_title">
                <span className="panel_title_right">سفارش های من</span>
            </div>
            <div className="order_holder">
                <div className="order_item">
                    <Link onClick={() => fetchUserOrdersHandler('all')} className="text-decoration-none" href="/dashboard?page=1&status=all">
                    <i className={`fal fa-shopping-cart ${(query.status === 'all' || query.status === undefined) ? 'text-success' : ''}`}></i>
                        <span className="title">
                            تمام سفارشات
                        </span>
                    </Link>
                </div>
                <div className="order_item">
                    <Link onClick={() => fetchUserOrdersHandler('preparation')} className="text-decoration-none text-dark" href="/dashboard?page=1&status=preparation">
                        <i className={`fal fa-circle-dashed ${query.status === 'preparation' ? 'text-success' : ''}`}></i>
                        <span className="title">
                            در حال پردازش
                        </span>
                    </Link>
                </div>
                <div className="order_item">
                    <Link onClick={() => fetchUserOrdersHandler('posted')} className="text-decoration-none text-dark" href="/dashboard?page=1&status=posted">
                        <i className={`fal fa-clipboard-check ${query.status === 'posted' ? 'text-success' : ''}`}></i>
                        <span className="title">
                            تحویل شده
                        </span>
                    </Link>
                </div>
                <div className="order_item">
                    <Link onClick={() => fetchUserOrdersHandler('cancelled')} className="text-decoration-none text-dark" href="/dashboard?page=1&status=cancelled">
                        <i className={`fal fa-cancel ${query.status === 'cancelled' ? 'text-success' : ''}`}></i>
                        <span className="title">
                            لغو شده
                        </span>
                    </Link>
                </div>
                <div className="order_item">
                    <Link onClick={() => fetchUserOrdersHandler('returned')} className="text-decoration-none text-dark" href="/dashboard?page=1&status=returned">
                        <i className={`fal fa-backward ${query.status === 'returned' ? 'text-success' : ''}`}></i>
                        <span className="title">
                            مرجوع شده
                        </span>
                    </Link>
                </div>
            </div>

            {displayOrderDetailPage && (
                <>
                    <div className="panel_table text-center">
                        <div className="panel_header_title">
                            <div className='pb-3 d-flex align-items-center justify-content-end'>
                                <div>
                                    <button type="button" className="btn_primary mt-3 border-0" onClick={() => hideOrderDetailPage()}>
                                        <i className="fa fa-reply" aria-hidden="true"></i>
                                        بازگشت
                                    </button>
                                </div>
                            </div>

                            <div className='pb-5 d-flex align-items-center justify-content-center'>
                                <div className=''>
                                    <span className="panel_title_right">
                                        شماره سفارش:
                                        &nbsp;
                                    </span>
                                    {orderDetail.order.orderNumber}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    {
                                        orderDetail?.order?.createdAt && (
                                            <div className=''>
                                                <span className=''>
                                                    تاریخ ثبت سفارش:
                                                    &nbsp;
                                                    {
                                                        moment(orderDetail.order.createdAt).format('jYYYY/jM/jD HH:mm:ss')
                                                    }
                                                </span>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="col-md-6">
                                    {
                                        orderDetail?.order?.status && (
                                            <div>
                                                <p>
                                                    وضعیت سفارش:
                                                    &nbsp;
                                                    {(() => {
                                                        switch(orderDetail.order.status) {
                                                            case 'preparation':
                                                                return (
                                                                    <>
                                                                        در حال پردازش
                                                                    </>
                                                                );
                                                            case 'posted':
                                                                return (
                                                                    <>
                                                                        تحویل شده
                                                                    </>
                                                                );
                                                            case 'cancelled':
                                                                return (
                                                                    <>
                                                                        لغو شده
                                                                    </>
                                                                );
                                                            case 'returned':
                                                                return (
                                                                    <>
                                                                        مرجوع شده
                                                                    </>
                                                                );
                                                            default:
                                                                return 'وضعیت نامعتبر';
                                                        }
                                                    })()}
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="col-md-6">
                                    {
                                        orderDetail?.order?.address && (
                                            <div>
                                                <p className='title'>
                                                    آدرس:
                                                    &nbsp;
                                                    {
                                                        orderDetail.order.address
                                                    }
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="col-md-6">
                                    {
                                        orderDetail?.order?.postalCode && (
                                            <div>
                                                <p>
                                                    کد پستی:
                                                    &nbsp;
                                                    {
                                                        orderDetail.order.postalCode
                                                    }
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="col-md-6">
                                    {
                                        orderDetail?.order?.trackingSerial && (
                                            <div>
                                                <p>
                                                    کد رهگیری پستی:
                                                    &nbsp;
                                                    {
                                                        orderDetail.order.trackingSerial
                                                    }
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                            <div className="panel_table text-center">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>
                                                ردیف
                                            </th>
                                            <th>
                                                نام محصول
                                            </th>
                                            <th>تعداد</th>
                                            <th>قیمت جزء</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderDetail.order.products.map((product: any, index :number) => (
                                            <tr key={product.id}>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>{product.productTitle}</td>
                                                <td>
                                                    {product.qty}
                                                </td>
                                                <td>
                                                    {product.price}
                                                    &nbsp;
                                                    تومان
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td className="text-end pe-3 py-4">
                                                <p className="mb-0 pb-3"></p>
                                            </td>
                                            <td className="text-end pe-3 py-4">
                                                <p className="mb-0 pb-3"></p>
                                            </td>
                                            <td className="text-center pe-3 py-4">
                                                <p className="mb-0 pb-3">جمع کل:</p>
                                            </td>
                                            <td className="ps-2 py-4">
                                                <p className="fw-medium mb-0 pb-3">
                                                    <bdi>
                                                        {
                                                            orderDetail.order.price
                                                        }    
                                                        &nbsp;
                                                        تومان
                                                    </bdi>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {!displayOrderDetailPage && (
                <>
                    <div className="panel_header_title">
                        <span className="panel_title_right">آخرین سفارش های من</span>
                    </div>
                    <div className="panel_table text-center">
                        <div className="table_header">
                            <span className="cell limit-text" style={{width: "calc(15% - 5px)"}}>شماره سفارش</span>
                            <span className="cell limit-text" style={{width: "calc(15% - 5px)"}}>تعداد محصول</span>
                            <span className="cell limit-text" style={{width: "calc(20% - 5px)"}}>تاریخ ثبت سفارش</span>
                            <span className="cell limit-text" style={{width: "calc(20% - 5px)"}}>وضعیت ارسال</span>
                            <span className="cell limit-text" style={{width: "calc(20% - 5px)"}}>قیمت</span>
                        </div>

                        {orders && orders.docs.map((orderItem :any) => (
                            <div key={orderItem._id}  className="table_row">
                                <span className="cell limit-text" style={{width: "calc(15% - 5px)"}}>
                                    <Link href="#" onClick={() => getUserOrderByIdHandler(orderItem._id)} className="t_title">کد: </Link>
                                    
                                    <Link href="#" onClick={() => getUserOrderByIdHandler(orderItem._id)} className="text-decoration-none">
                                        {orderItem.orderNumber}
                                    </Link>
                                </span>
                                <span className="cell limit-text" style={{width: "calc(15% - 5px)"}}>
                                    <span className="t_title">تعداد محصول: </span>
                                    {orderItem.products.length}
                                </span>
                                <span className="cell limit-text" style={{width: "calc(20% - 5px)"}}>
                                    <span className="t_title">تاریخ ثبت سفارش: </span>
                                    {
                                        moment(orderItem.createdAt).format('jYYYY/jM/jD HH:mm:ss')
                                    }
                                </span>
                                <span className="cell limit-text" style={{width: "calc(20% - 5px)"}}>
                                    <span className="t_title">
                                    وضعیت ارسال: 
                                    </span>
                                    {(() => {
                                        switch(orderItem.status) {
                                            case 'preparation':
                                                return (
                                                    <>
                                                        <i className="fas fa-circle circle_orange"></i>
                                                        در حال پردازش
                                                    </>
                                                );
                                            case 'posted':
                                                return (
                                                    <>
                                                        <i className="fas fa-circle circle_green"></i>
                                                        تحویل شده
                                                    </>
                                                );
                                            case 'cancelled':
                                                return (
                                                    <>
                                                        <i className="fas fa-circle circle_red"></i>
                                                        لغو شده
                                                    </>
                                                );
                                            case 'returned':
                                                return (
                                                    <>
                                                        <i className="fas fa-circle circle_red"></i>
                                                        مرجوع شده
                                                    </>
                                                );
                                            default:
                                                return 'وضعیت نامعتبر';
                                        }
                                    })()}
                                </span>
                                <span className="cell limit-text" style={{width: "calc(20% - 5px)"}}><span className="t_title">قیمت: </span>
                                {orderItem.price}
                                &nbsp;
                                تومان
                                </span>
                            </div>
                        ))}

                        {
                            !orders.docs.length && (
                                <p className='mt-3'>
                                    هیچ سفارشی یافت نشد!
                                </p>
                            )
                        }

                        <Pagination totalPages={orders.totalPages} page={orders.page} status={orderStatusPagination} />
                    </div>
                </>
            )}

            
       </>
    )
}

export default OrdersList;