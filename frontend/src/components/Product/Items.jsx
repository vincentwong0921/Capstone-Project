import './Items.css'

function Items({ items, selectedModel }) {
    let itemsToRender
    if(selectedModel === "All Models") {
        itemsToRender = items
    } else {
        itemsToRender = items.filter(item => item.model === selectedModel)
    }

    return (
        <>
            {itemsToRender && itemsToRender.map(item =>
                <div key={item.id}>
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
