import React from "react";

export default function Modal({
    image,
    title,
    description,
    children,
    primaryButton = "",
    secondaryButton = "",
    hideFooter = false,
    width = "max-w-md",
    styles = {}
}) {
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50 ${styles.overlay || ""}`}
        >
            <div className={`bg-img rounded-2xl p-4 w-full ${styles.wrapper || "max-w-md shadow-xl relative"}`}>
                <div className={`bg-white rounded-lg shadow-lg p-6 w-full ${width} ${styles.content || ""}`}>

                    {/* Image/Icon */}
                    {image && (
                        <div className={`${styles.imageWrapper || "flex justify-center mb-4"}`}>
                            <img
                                src={image}
                                alt="icon"
                                className={`${styles.image || "w-20 h-20"}`}
                            />
                        </div>
                    )}

                    {/* Title */}
                    {title && (
                        <h2 className={`${styles.title || "text-lg font-semibold text-center text-grey-800"}`}>
                            {title}
                        </h2>
                    )}

                    {/* Description */}
                    {description && (
                        <p className={`${styles.description || "text-center text-grey-500 mt-2"}`}>
                            {description}
                        </p>
                    )}

                    {/* Body (Children Content) */}
                    <div className={`${styles.body || "mt-4"}`}>
                        {children}
                    </div>

                    {/* Footer Buttons */}
                    {!hideFooter && (
                        <div className={`${styles.footer || "flex justify-center gap-3 mt-6"}`}>
                            {primaryButton && (
                                <button
                                    className={` cursor-pointer ${styles.primaryButton || "px-4 py-2 bg-primary-600 text-white rounded-4xl"}`}
                                >
                                    {primaryButton}
                                </button>
                            )}
                            {secondaryButton && (
                                <button
                                    className={` cursor-pointer ${styles.secondaryButton || "px-4 py-2 bg-grey-100 text-gray-600 rounded-4xl"}`}
                                >
                                    {secondaryButton}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
