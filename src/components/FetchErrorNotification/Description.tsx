import { memo } from "react";

// FIXME: Improve the description here
const Description = memo<{ message: string; status: number }>(({ message, status }) => {
    return (
        <div>
            {message}:{status}
        </div>
    )
})

export default Description;