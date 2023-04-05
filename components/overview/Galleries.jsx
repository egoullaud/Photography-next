import React from "react";

function Galleries({ categories }) {
  return (
    <div className="mx-2">
      <h3 className="uppercase text-3xl text-center my-[2rem] tracking-wider border-b-2 border-[#363636]">
        Galleries
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <h1>{category.title}</h1>
        ))}
      </div>
    </div>
  );
}

export default Galleries;
