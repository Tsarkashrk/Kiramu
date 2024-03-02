import React from "react";

const Iframe = (anime) => {
  return (
    <div className="iframe">
          <iframe
            className="iframe__player"
            src={`https://www.anilibria.tv/public/iframe.php?id=${anime.anime.id}`}
            type="text/html"
            frameBorder="0"
            allowFullScreen></iframe>
        </div>
  )
}

export default Iframe;