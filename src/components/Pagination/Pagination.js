const Pagination = ({ page, pages, changePage, totalCount }) => {
  let middlePagination;
  if (page === 1 && pages === 1) {
    return (
      <button
        style={{
          background: page === 1 ? "#FF5833" : "none",
          color: page === 1 ? "#fff" : "#232323",
          fontSize: "16px",
          outline: "none",
          border: "none",
          borderRadius: "10px",
          padding: "12px 18px",
          cursor: "pointer",
        }}
      >
        1
      </button>
    );
  }
  if (pages <= 5) {
    middlePagination = [...Array(pages)].map((_, idx) => (
      <button
        key={idx + 1}
        onClick={() => changePage(idx + 1)}
        disabled={page === idx + 1}
        style={{
          background: page === idx + 1 ? "#FF5833" : "none",
          color: page === idx + 1 ? "#fff" : "#232323",
          fontSize: "16px",
          outline: "none",
          border: "none",
          borderRadius: "10px",
          padding: "15px",
          cursor: "pointer",
        }}
      >
        {idx + 1}
      </button>
    ));
  } else {
    const startValue = Math.floor((page - 1) / 5) * 5;

    middlePagination = (
      <>
        {[...Array(5)].map((_, idx) => (
          <button
            key={startValue + idx + 1}
            disabled={page === startValue + idx + 1}
            onClick={() => changePage(startValue + idx + 1)}
            style={{
              fontSize: "16px",
              outline: "none",
              border: "none",
              borderRadius: "10px",
              padding: "15px",
              background: page === idx + 1 ? "#FF5833" : "none",
              color: page === idx + 1 ? "#fff" : "#232323",
            }}
          >
            {startValue + idx + 1}
          </button>
        ))}

        <button
          style={{
            background: "none",
            color: "#000",
            outline: "none",
            border: "none",
            borderRadius: "10px",
            padding: "15px",
            fontSize: "15px",
          }}
        >
          ...
        </button>
        <button
          onClick={() => changePage(pages)}
          style={{
            background: "none",
            color: "#000",
            outline: "none",
            border: "none",
            borderRadius: "10px",
            padding: "15px",
            fontSize: "15px",
          }}
        >
          {pages}
        </button>
      </>
    );

    if (page > 5) {
      if (pages - page >= 5) {
        middlePagination = (
          <>
            <button
              onClick={() => changePage(1)}
              style={{
                background: "green",

                color: "#000",
                outline: "none",
                border: "none",
                borderRadius: "10px",
                padding: "15px",
                fontSize: "15px",
              }}
            >
              1
            </button>
            <button
              style={{
                background: "green",

                color: "#fff",
                outline: "none",
                border: "none",
                borderRadius: "10px",
                padding: "15px",
                fontSize: "10px",
              }}
            >
              ...
            </button>
            <button onClick={() => changePage(startValue)}>{startValue}</button>
            {[...Array(5)].map((_, idx) => (
              <button
                style={{
                  background: "green",
                  color: "#fff",
                  outline: "none",
                  border: "none",
                  borderRadius: "10px",
                  padding: "15px",
                  fontSize: "10px",
                }}
                key={startValue + idx + 1}
                disabled={page === startValue + idx + 1}
                onClick={() => changePage(startValue + idx + 1)}
              >
                {startValue + idx + 1}
              </button>
            ))}

            <button>...</button>
            <button onClick={() => changePage(pages)}>{pages}</button>
          </>
        );
      } else {
        let amountLeft = pages - page + 5;
        middlePagination = (
          <>
            <button
              onClick={() => changePage(1)}
              style={{
                background: "none",
                color: "#000",
                outline: "none",
                border: "none",
                borderRadius: "10px",
                padding: "15px",
                fontSize: "15px",
              }}
            >
              1
            </button>
            <button
              style={{
                background: "none",
                color: "#000",
                outline: "none",
                border: "none",
                borderRadius: "10px",
                padding: "15px",
                fontSize: "15px",
              }}
            >
              ...
            </button>
            <button
              onClick={() => changePage(startValue)}
              style={{
                background: "none",
                color: "#000",
                outline: "none",
                border: "none",
                borderRadius: "10px",
                padding: "15px",
                fontSize: "15px",
              }}
            >
              {startValue}
            </button>
            {[...Array(amountLeft)].map((_, idx) => (
              <button
                key={startValue + idx + 1}
                disabled={page === startValue + idx + 1}
                style={
                  pages < startValue + idx + 1
                    ? { display: "none" }
                    : {
                        background: "#FF5833",
                        color: "#fff",
                        outline: "none",
                        border: "none",
                        borderRadius: "10px",
                        padding: "15px",
                        fontSize: "10px",
                      }
                }
                onClick={() => changePage(startValue + idx + 1)}
              >
                {startValue + idx + 1}
              </button>
            ))}
          </>
        );
      }
    }
  }

  return (
    pages > 1 && (
      <div className="pagination">
        <button
          style={{
            width: "30px",
            height: "40px",
            borderRadius: "10px",
            border: "none",
            marginRight: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            backgroundColor: "white",
            color: "rgba(54, 48, 98, 1)",
          }}
          onClick={() => changePage((page) => page - 1)}
          disabled={page === 1}
        >
          <img src="./images/Vectoria.png" alt="" />
        </button>
        {middlePagination}
        <button
          style={{
            width: "30px",
            height: "40px",
            borderRadius: "34px",
            border: "none",
            marginLeft: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            backgroundColor: "white",
            color: "rgba(54, 48, 98, 1)",
          }}
          onClick={() => changePage((page) => page + 1)}
          disabled={page === pages}
        >
          <img src="./images/Vectori.png" />
        </button>
      </div>
    )
  );
};

export default Pagination;
