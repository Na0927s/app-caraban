import React from 'react';

interface PaymentHistoryItem {
  id: string;
  caravanName: string;
  startDate: string;
  endDate: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
}

interface PaymentHistoryProps {
  payments: PaymentHistoryItem[];
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ payments }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">결제 이력</h3>
      {payments.length === 0 ? (
        <p className="text-gray-600">결제 이력이 없습니다.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left text-gray-600">카라반</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">기간</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">금액</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">상태</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="py-2 px-4 border-b">{payment.caravanName}</td>
                  <td className="py-2 px-4 border-b">{payment.startDate} ~ {payment.endDate}</td>
                  <td className="py-2 px-4 border-b">{payment.amount.toLocaleString()}원</td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {payment.status === 'completed' && '완료'}
                      {payment.status === 'pending' && '대기 중'}
                      {payment.status === 'cancelled' && '취소됨'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
