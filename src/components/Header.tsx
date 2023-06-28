
import '../styling/header.css';

export default function Header(props: any) {

    return (
        <div className='header' style={{ backgroundColor: 'var(--light)'}}>
            {props.children}
        </div>
    )
}