import React from 'react'

export default function Output({output}) {
    return (
        <>
            {output.map((item, index) => {
                return (
                    <div key={item.id}>
                        {item}
                    </div>
                )
            })}
        </>
    )
}
