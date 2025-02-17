export default function LoadingPage(){
    return(
        <div className="flex-col gap-4 w-full fixed inset-0 bg-black bg-opacity-50 z-50 
            flex items-center justify-center">
            <div
                className="w-20 h-20 border-4 border-transparent text-primary-300 text-4xl animate-spin 
                flex items-center justify-center border-t-primary-300 rounded-full"
            >
                <div
                className="w-16 h-16 border-4 border-transparent text-primary-600 text-2xl animate-spin 
                flex items-center justify-center border-t-primary-600 rounded-full"
                >
                </div>
            </div>
        </div>
    )
}