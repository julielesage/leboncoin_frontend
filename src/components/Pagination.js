import React from "react";

// TO KEEP SAME URL DURING PAGINATION :

// const Pagination = ({ setSkip, skip, count }) => {
//   const clickPrevious = () => {
//     setSkip(skip - 3);
//   };

//   const clickNext = () => {
//     setSkip(skip + 3);
//   };
//   return (
//     <div className="pagination">
//       {skip !== 0 && <button onClick={clickPrevious}>Page précédente</button>}
//       {skip + 3 < count && <button onClick={clickNext}>Page suivante</button>}
//     </div>
//   );
// };

// TO CHANGE URL PER RESULT PAGINATION :

const Pagination = ({ limit, count, currentPage, paginate }) => {
  //pagination tab [1, 2, 3, 4, ...]
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(count / limit); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="d-flex centered">
      <ul className="page-nav d-flex ">
        <li
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) paginate(currentPage - 1);
          }}
        >
          <p
            className={
              currentPage > 1 ? "is-blue cursor extra-bold" : "grey extra-bold"
            }
          >
            〈
          </p>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage !== number) paginate(number);
            }}
          >
            <p
              className={
                currentPage === number ? "extra-bold is-blue" : "blue cursor"
              }
            >
              {number}
            </p>
          </li>
        ))}

        <li
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < pageNumbers.length) paginate(currentPage + 1);
          }}
        >
          <p
            className={
              currentPage < pageNumbers.length
                ? "extra-bold is-blue cursor"
                : "extra-bold grey"
            }
          >
            〉
          </p>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
