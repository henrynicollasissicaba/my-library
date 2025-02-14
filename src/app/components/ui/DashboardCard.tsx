interface DashboardInfoProps {
    titleInfo: string
    subtitleInfo: string
    numberInfo: number
}

export default function DashboardCard(params: DashboardInfoProps) {
    return (
        <div className="relative w-[300px] h-[250px] rounded-[10px] p-[1px] bg-gradient-to-br from-primary-600 via-primary-300 to-[#0c0d0d]">
          {/* Animated Dot */}
          <div 
            className="absolute w-[5px] h-[5px] bg-white rounded-full shadow-[0_0_10px_#ffedd3] z-10 animate-dot"
            style={{
              top: '10%',
              right: '10%'
            }}
          />
          
          {/* Main Card */}
          <div className="relative z-[1] w-full h-full rounded-[9px] border border-[#202222] bg-gradient-to-br from-[#444444] to-[#0c0d0d] flex flex-col items-center justify-center text-white">
            {/* Light Ray */}
            <div className="absolute w-[220px] h-[45px] rounded-[100px] bg-primary-200 opacity-30 shadow-[0_0_50px_#ffedd3] blur-[10px] origin-[10%] top-0 left-0 rotate-[40deg]" />
            
            {/* Content */}
            <div>{params.titleInfo}</div>
            <div className="font-bold text-6xl bg-gradient-to-r from-black via-primary-100 to-black bg-clip-text text-transparent">
              {params.numberInfo}
            </div>
            <div>{params.subtitleInfo}</div>
            
            {/* Border Lines */}
            <div className="absolute top-[10%] w-full h-[1px] bg-gradient-to-r from-primary-200 via-primary-400 to-[#1d1f1f]" />
            <div className="absolute bottom-[10%] w-full h-[1px] bg-[#2c2c2c]" />
            <div className="absolute left-[10%] w-[1px] h-full bg-gradient-to-b from-primary-200 via-primary-400 to-[#222424]" />
            <div className="absolute right-[10%] w-[1px] h-full bg-[#2c2c2c]" />
          </div>
        </div>
      );
}
