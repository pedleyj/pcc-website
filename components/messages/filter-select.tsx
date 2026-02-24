'use client'

interface FilterSelectProps {
  name: string
  defaultValue: string
  label: string
  options: string[]
  placeholder: string
}

export function FilterSelect({ name, defaultValue, label, options, placeholder }: FilterSelectProps) {
  return (
    <select
      name={name}
      defaultValue={defaultValue}
      onChange={(e) => {
        const form = e.target.closest('form')
        if (form) form.requestSubmit()
      }}
      className="rounded-lg border border-pcc-cream-dark bg-white px-4 py-2 text-sm text-pcc-navy focus:border-pcc-teal focus:outline-none focus:ring-2 focus:ring-pcc-teal/30"
      aria-label={label}
    >
      <option value="">{placeholder}</option>
      {options.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  )
}
