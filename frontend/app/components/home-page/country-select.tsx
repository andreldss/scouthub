import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/components/ui/select";

const countries = [
  { id: "Brazil", label: "Brasil", img: "https://media.api-sports.io/flags/br.svg" },
];

export function CountrySelect({ onChange }: { onChange: (id: string) => void }) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[220px] text-gray-300">
        <SelectValue placeholder="Selecione um país" />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.id} value={country.id}>
            <div className="flex items-center gap-2">
              <img src={country.img} alt={country.label} className="w-5 h-4" />
              <span>{country.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
