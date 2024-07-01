import Link from "next/link";

const Pagination = (props :any) => {
    const { totalPages, page } = props;
    
    if (totalPages <= 1) {
        return null;
    }
   
    const renderPageNumbers = () => {
        let pageNumbers = [];
        let startPage = page > 5 ? page - 4 : 1;
    
        if (startPage !== 1) {
            pageNumbers.push(
               <Link key="start-ellipsis" className="text-decoration-none" href="#">...</Link>
            );
        }
    
        for (let i = startPage; i <= totalPages; i++) {
            if (i === page) {
                pageNumbers.push(
                    <Link key={i} className="text-decoration-none current" href="#"><span>{i}</span></Link>
                );
            } else {
                pageNumbers.push(
                    <Link key={i} className="text-decoration-none" href={`?page=${i}`}>{i}</Link>
                );
            }
        
            if (i === page + 4) {
                pageNumbers.push(
                    <Link key="end-ellipsis" className="text-decoration-none" href="#">...</Link>
                );
                break;
            }
        }
    
        return pageNumbers;
      };
    
      return (
        <div className="paging">
            {page > 1 && (
                <Link key="first-page" className="text-decoration-none" href="?page=1">
                    <i className="fal fa-chevron-right"></i>
                </Link>
            )}
            {renderPageNumbers()}
            {page !== totalPages && (
                <Link key="last-page" className="text-decoration-none" href={`?page=${totalPages}`}>
                    <i className="fal fa-chevron-left"></i>
                </Link>
            )}
        
        </div>
    );    
};
  
export default Pagination;

