export default function InputBox({label, type}) {
    return (
        <div>
            <label>{label}</label>
            <input type={type}/>
        </div>
    )
}