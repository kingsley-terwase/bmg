// ProcessPaymentPage.jsx
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import BrandLoader from "../../../Component/BrandLoader";
import { useVerifyPaystackTxn } from "../../../Hooks/general";

const ProcessPaymentPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { verifyPaystackTxn } = useVerifyPaystackTxn();

    useEffect(() => {
        const verifyPayment = async () => {
            const trxref = searchParams.get('trxref');

            if (trxref) {
                try {
                    const response = await verifyPaystackTxn(trxref);

                    // Check if payment was successful
                    if (response?.data?.success && response?.data?.result?.paystack_data?.status === 'success') {
                        // Navigate to success page with transaction data
                        navigate('/payment/success', {
                            state: {
                                transaction: response.data.result.transaction,
                                paystackData: response.data.result.paystack_data
                            }
                        });
                    } else {
                        navigate('/payment/fail');
                    }
                } catch (error) {
                    console.error('Payment verification error:', error);
                    navigate('/payment/fail');
                }
            } else {
                // No transaction reference found
                navigate('/payment/fail');
            }
        };

        verifyPayment();
    }, [searchParams, verifyPaystackTxn, navigate]);

    return <BrandLoader message="Processing payment...." />;
}

export default ProcessPaymentPage;