import InputBox from "./InputBox.jsx";

export default function InputsContainer() {
    return (
            <div className="input-group">
                <InputBox label="Initial Investment" type="number"/>
                <InputBox label="Annual Investment" type="number"/>
                <InputBox label="Expected return" type="number"/>
                <InputBox label="Duration" type="number"/>
            </div>
    )
}