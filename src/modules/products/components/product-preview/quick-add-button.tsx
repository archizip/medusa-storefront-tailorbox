"use client"

/**
 * Small interactive button rendered inside the product card link.
 * Prevents the click from triggering navigation of the wrapping link.
 * Lives in its own client component because the parent ProductPreview
 * is a Server Component and cannot attach event handlers.
 */
const QuickAddButton = ({ label }: { label: string }) => {
  return (
    <button
      onClick={(e) => e.preventDefault()}
      className="btn-ghost"
      style={{
        padding: "4px 8px",
        fontSize: 12,
        fontFamily: "var(--mono)",
        letterSpacing: "0.05em",
        color: "var(--ink-2)",
        borderRadius: 2,
      }}
    >
      {label}
    </button>
  )
}

export default QuickAddButton
