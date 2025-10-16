function InfoCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center justify-center text-center">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </div>
  );
}

export default InfoCard;
