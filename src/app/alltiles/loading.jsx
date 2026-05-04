const BookLoading = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
            
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

            <p className="text-gray-600 text-lg font-medium">
                Loading ...
            </p>

        </div>
    );
};

export default BookLoading;