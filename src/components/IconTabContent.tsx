interface contentProps {
    icons: string[],
    imageGetter: Function;
}

export default function IconTabContent(props: contentProps) {
    const iconNameToImg = () => {
        return props.icons.map((name: string) => {
            return (
                <div key={name} className='player-icon'>
                    <img src={props.imageGetter(name)} alt={name}/>
                </div>
            )
            
        })
    }

    return (
        <div className="icon-tab-content">
            {iconNameToImg()}
        </div>
    )
}