export default function ApplicationLogo(props) {
  return (
    <div className="flex justify-center items-center h-80vh">
      <img
        {...props}
        src="https://armp.mr/wp-content/uploads/2021/03/logoipn.jpg"
        alt="Logo"
        className="w-20 h-16"
      />
      <div className="font-bold">Institut Pédagogique National</div>
    </div>
  );
}
