export const InputField = ({dataList, setData, label}) => {

  const handleChange = (e) => {
    setData(e.target.value)
  }

  return (
    <form>
      <select className="border border-black rounded-full px-2 py-1 my-3" onChange={handleChange}>
        <option>-- select {label} --</option>
        {dataList.map((data, id) => (
          <option key={id}>{data}</option>
        ))}
      </select>
    </form>
  )
}