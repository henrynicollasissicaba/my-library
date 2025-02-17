export default function LoadingSpinner(){
    const blades = Array.from({ length: 12 });

  return (
    <div className="flex justify-center items-center">
      <div className="relative h-[17px]">
        <style>
          {`
            @keyframes spinnerFade {
              0% {
                background-color: #69717d;
              }
              100% {
                background-color: transparent;
              }
            }

            .spinner-blade {
              position: absolute;
              left: 46.29%;
              bottom: 0;
              width: 0.074em;
              height: 0.2777em;
              border-radius: 0.0555em;
              background-color: transparent;
              transform-origin: center -0.2222em;
              animation: spinnerFade 1s infinite linear;
            }
          `}
        </style>
        
        {blades.map((_, index) => (
          <div
            key={index}
            className="spinner-blade"
            style={{
              transform: `rotate(${index * 30}deg)`,
              animationDelay: `${(index * 0.083).toFixed(3)}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}