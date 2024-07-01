import Input from '@/app/components/shared/form/input';
import CustomLoginInput from '@/app/components/shared/form/customLoginInput';
import { UserCheckoutFormInterface } from '@/app/contracts/checkout/index';
import { ErrorMessage, Form, FormikProps, Field } from 'formik';
import Link from 'next/link';
import useOrder from '@/app/hooks/order/useOrder';

const PreparationOrdersCount = () => {

    const {loading, order} :any = useOrder({ status: 'preparation' });

    if(loading) {
        return;
    }

    return (
        <div className="statistics_item">
            <span className="icon"><i className="far fa-basket-shopping"></i></span>
            <div className="statics_detail">
                <span className="statistic_title">سفارش های در حال اجرا</span>
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

export default PreparationOrdersCount;