const FeatureCard = ({ title, icon: Icon, iconClassName = "w-32 h-32" }) => {
  return (
    <div className="bg-emerald-900 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[280px] hover:scale-105 transition-transform duration-300">
      <h3 className="text-stone-100 text-2xl font-bold mb-6 text-center">{title}</h3>
      <div className="flex items-center justify-center flex-1">
        <Icon className={`${iconClassName} text-amber-100`} strokeWidth={1.5} />
      </div>
    </div>
  );
};

export default FeatureCard;
