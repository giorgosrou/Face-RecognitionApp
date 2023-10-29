import React from "react";

const Rank = ({name, entries}) => {
    return (
        <div>
            <div className="white f3">
                {`${name}, your total number of detected faces is...`}
            </div>
            <div className="white f1">
                {entries}
            </div>
        </div>
    )
}

export default Rank;