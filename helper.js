exports.success = (message, data) => {
  return { message, data};
};

exports.getUniqueId=(cars)=>{
    const carsIds= cars.map(car => car.id);
    const maxID = carsIds.reduce((a,b)=>Math.max(a,b));
    const uniqueId = maxID+1;

    return uniqueId;
}


