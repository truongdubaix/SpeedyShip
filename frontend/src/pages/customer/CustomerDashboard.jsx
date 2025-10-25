import { useEffect, useState } from "react";
import API from "../../services/api";

export default function CustomerDashboard() {
  const [shipments, setShipments] = useState([]);
  const customerId = localStorage.getItem("customer_id"); // lưu khi login

  useEffect(() => {
    if (!customerId) return;
    API.get(`/customers/shipments/${customerId}`)
      .then((res) => setShipments(res.data))
      .catch((err) => console.error(err));
  }, [customerId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 My Shipments</h1>

      {shipments.length === 0 ? (
        <p>No shipments found.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Tracking Code</th>
              <th className="border p-2">Receiver</th>
              <th className="border p-2">Delivery Address</th>
              <th className="border p-2">Weight (kg)</th>
              <th className="border p-2">COD (₫)</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((s) => (
              <tr key={s.id} className="text-center hover:bg-gray-50">
                <td className="border p-2">{s.tracking_code}</td>
                <td className="border p-2">{s.receiver_name}</td>
                <td className="border p-2">{s.delivery_address}</td>
                <td className="border p-2">{s.weight_kg}</td>
                <td className="border p-2">{s.cod_amount?.toLocaleString()}</td>
                <td className="border p-2 font-semibold">{s.status}</td>
                <td className="border p-2">
                  {new Date(s.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
