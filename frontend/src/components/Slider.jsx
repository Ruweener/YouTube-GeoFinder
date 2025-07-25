import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


export default function DiscreteSlider({ value, setValue }) {
    const defaultVal = 50;

    function valuetext(value) {
        return `${value}km`;
    }

    const handleChange = (e, newValue) => {
        setValue(newValue);
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Slider
                aria-label="Radius"
                defaultValue={defaultVal}
                value={value}
                getAriaValueText={valuetext}
                onChange={handleChange}
                valueLabelDisplay="auto"
                shiftStep={10}
                step={10}
                marks
                min={10}
                max={100}
            />
        </Box>
    );
}