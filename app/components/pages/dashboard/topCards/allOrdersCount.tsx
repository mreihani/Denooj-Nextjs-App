import Input from '@/app/components/shared/form/input';
import CustomLoginInput from '@/app/components/shared/form/customLoginInput';
import { UserCheckoutFormInterface } from '@/app/contracts/checkout/index';
import { ErrorMessage, Form, FormikProps, Field } from 'formik';
import Link from 'next/link';
import useOrder from '@/app/hooks/order/useOrder';

const AllOrdersCount = () => {

    const {loading, order} :any = useOrder({ status: 'all' });

    if(loading) {
        return;
    }

    return (
        <div className="statistics_item">
            <span className="icon">
                <i className="far fa-sack"></i>
            </span>
            <div className="statics_detail">
                <span className="statistic_title">سفارش های من</span>
                <span className="statistic_num">
                    {
                        order.totalDocs
                    }
                </span>
                <span className="statistic_type">عدد</span>
            </div>
        </div>
    )
}

export default AllOrdersCount;