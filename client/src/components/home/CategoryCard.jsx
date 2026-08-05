function CategoryCard({ category }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer">

      <img
        src={category.image}
        alt={category.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 text-center">

        <h3 className="text-xl font-semibold">
          {category.name}
        </h3>

      </div>

    </div>
  );
}

export default CategoryCard;