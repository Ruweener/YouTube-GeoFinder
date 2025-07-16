import React from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


export default function DiscreteSlider({ value, setValue }) {

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
                defaultValue={30}
                value={value}
                getAriaValueText={valuetext}
                onChange={handleChange}
                valueLabelDisplay="auto"
                shiftStep={30}
                step={50}
                marks
                min={50}
                max={1000}
            />
        </Box>
    );
}