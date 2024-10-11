import React, { useState, useEffect } from 'react'
import styles from './ProgressBar.module.css'
function ProgressBar() {


    const [filled, setFilled] = useState(0);

	useEffect(() => {
		if (filled < 100) {
			setTimeout(() => setFilled(prev => prev += 2), 117)
		}
	},[filled])
    return (
        <div className={`${styles.progress}`}>
            <div className={`${styles.swiper_progress_bar}`}>
                <div style={{
				  height: "100%",
				  width: `${filled}%`,
				  backgroundColor: "#ef394e",
				  transition:"width 0.5s"
			  }} >
                </div>
            </div>
            
        </div>
    )
}

export default ProgressBar