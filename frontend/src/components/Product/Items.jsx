import './Items.css'

function Items({ items, selectedModel }) {
    console.log(selectedModel)
    return (
        <>
            {items && items.map(item =>
                <div key={item.id}>
                    {item.brand}
                    {item.model}
                    {item.carrier}
                    {item.storage}
                    {item.color}
                    {item.condition}
                    {item.price}
                    <img className='InvImage' src={item.image_url}/>
                </div>
            )}
        </>
    )
}


export default Items
