import { useState } from 'react';
import { CreditCard, Lock, Check } from 'lucide-react';
import './CreditCardForm.scss';
import { useNavigate } from 'react-router-dom';

interface ValidationErrors {
  cardNumber?: string;
  cardHolder?: string;
  expDate?: string;
  cvv?: string;
}
const CardInputForm = ({ total }: { total: string }) => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardHolder, setCardHolder] = useState<string>('');
  const [expDate, setExpDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const getCardType = (number: string): string => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.startsWith('4')) return 'Visa';
    if (cleaned.startsWith('5')) return 'Mastercard';
    if (cleaned.startsWith('3')) return 'Amex';
    return 'Card';
  };

  const luhnCheck = (cardNumber: string): boolean => {
    const cleaned = cardNumber.replace(/\s/g, '');
    let sum = 0;
    let isEven = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i], 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  const handleCardNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = e.target.value.replace(/\s/g, '');
    if (/^\d*$/.test(value) && value.length <= 16) {
      setCardNumber(formatCardNumber(value));
      if (errors.cardNumber) {
        setErrors({ ...errors, cardNumber: undefined });
      }
    }
  };

  const handleCardHolderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setCardHolder(value.toUpperCase());
      if (errors.cardHolder) {
        setErrors({ ...errors, cardHolder: undefined });
      }
    }
  };

  const handleExpDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    if (value.length <= 5) {
      setExpDate(value);
      if (errors.expDate) {
        setErrors({ ...errors, expDate: undefined });
      }
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setCvv(value);
      if (errors.cvv) {
        setErrors({ ...errors, cvv: undefined });
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    const cardNumberClean = cardNumber.replace(/\s/g, '');

    if (cardNumberClean.length !== 16) {
      newErrors.cardNumber = 'Card number must be exactly 16 digits';
    } else if (!luhnCheck(cardNumber)) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!cardHolder.trim()) {
      newErrors.cardHolder = 'Card holder name is required';
    } else if (cardHolder.trim().length < 3) {
      newErrors.cardHolder = 'Name must be at least 3 characters';
    }

    if (expDate.length !== 5) {
      newErrors.expDate = 'Enter valid expiration date (MM/YY)';
    } else {
      const [month, year] = expDate.split('/');
      const monthNum = parseInt(month, 10);
      const yearNum = parseInt(year, 10) + 2000;
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;

      if (monthNum < 1 || monthNum > 12) {
        newErrors.expDate = 'Invalid month';
      } else if (
        yearNum < currentYear ||
        (yearNum === currentYear && monthNum < currentMonth)
      ) {
        newErrors.expDate = 'Card has expired';
      }
    }

    if (cvv.length < 3) {
      newErrors.cvv = 'CVV must be at least 3 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (validateForm()) {
      setIsSubmitting(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setCardNumber('');
        setCardHolder('');
        setExpDate('');
        setCvv('');
        setIsSuccess(false);
        navigate('/');
      }, 3000);
    }
  };

  return (
    <div className="flex justify-center mt-2">
      {isSuccess ?
        <div className="flex flex-col items-center py-12 mb-6">
          <div className="relative">
            <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <Check className="w-16 h-16 text-white stroke-[3]" />
            </div>
            <div className="absolute inset-0 w-32 h-32 bg-green-400 rounded-full animate-ping opacity-75"></div>
          </div>
          <p className="text-2xl font-bold text-green-600 mt-6">
            Payment Successful!
          </p>
          <p className="text-gray-600 mt-2">
            Your transaction has been completed
          </p>
        </div>
      : <div className="rounded-2xl w-full max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-primary">Payment Details</h2>
          </div>

          {/* Card Preview */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 mb-6 text-white shadow-lg">
            <div className="flex justify-between items-start mb-8">
              <div className="text-xs opacity-80">
                {getCardType(cardNumber)}
              </div>
              <Lock className="w-5 h-5 opacity-80" />
            </div>
            <div className="font-mono text-lg mb-4 tracking-wider">
              {cardNumber || '•••• •••• •••• ••••'}
            </div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs opacity-70 mb-1">Card Holder</div>
                <div className="font-semibold text-sm">
                  {cardHolder || 'YOUR NAME'}
                </div>
              </div>
              <div>
                <div className="text-xs opacity-70 mb-1">Expires</div>
                <div className="font-semibold text-sm">
                  {expDate || 'MM/YY'}
                </div>
              </div>
            </div>
          </div>

          <div className="credit-card-form space-y-5">
            {/* Card Number */}
            <div>
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-primary mb-2"
              >
                Card Number
              </label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                aria-invalid={!!errors.cardNumber}
                aria-describedby={
                  errors.cardNumber ? 'cardNumber-error' : undefined
                }
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.cardNumber && (
                <p
                  id="cardNumber-error"
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.cardNumber}
                </p>
              )}
            </div>

            {/* Card Holder Name */}
            <div>
              <label
                htmlFor="cardHolder"
                className="block text-sm font-medium text-primary mb-2"
              >
                Card Holder Name
              </label>
              <input
                id="cardHolder"
                name="cardHolder"
                type="text"
                value={cardHolder}
                onChange={handleCardHolderChange}
                placeholder="JOHN DOE"
                aria-invalid={!!errors.cardHolder}
                aria-describedby={
                  errors.cardHolder ? 'cardHolder-error' : undefined
                }
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.cardHolder ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.cardHolder && (
                <p
                  id="cardHolder-error"
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.cardHolder}
                </p>
              )}
            </div>

            {/* Expiration Date and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="expDate"
                  className="block text-sm font-medium text-primary mb-2"
                >
                  Expiration Date
                </label>
                <input
                  id="expDate"
                  name="expDate"
                  type="text"
                  value={expDate}
                  onChange={handleExpDateChange}
                  placeholder="MM/YY"
                  aria-invalid={!!errors.expDate}
                  aria-describedby={
                    errors.expDate ? 'expDate-error' : undefined
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.expDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.expDate && (
                  <p
                    id="expDate-error"
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.expDate}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="cvv"
                  className="block text-sm font-medium text-primary mb-2"
                >
                  CVV
                </label>
                <input
                  id="cvv"
                  name="cvv"
                  type="password"
                  value={cvv}
                  onChange={handleCvvChange}
                  placeholder="123"
                  aria-invalid={!!errors.cvv}
                  aria-describedby={errors.cvv ? 'cvv-error' : undefined}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.cvv ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.cvv && (
                  <p
                    id="cvv-error"
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.cvv}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md cursor-pointer hover:shadow-lg ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Processing...' : `Pay ${total} $`}
            </button>
          </div>

          <p className="secured text-secondary text-center mt-4">
            <Lock className="w-3 h-3 inline mr-1" />
            Your payment information is secure and encrypted
          </p>
        </div>
      }
    </div>
  );
};

export default CardInputForm;
