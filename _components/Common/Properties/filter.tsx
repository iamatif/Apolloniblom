"use client";
import { RegionsWidget } from "@/_components/Homepage/Regions";
import { useEffect } from "react";
import Close from "@/_components/SVGs/Close";
import FilterIcon from "@/_components/SVGs/Filter";
import BedBathFilter from "./BedBathFilter";
import ListFilter from "./ListFilter";
import PriceFilter from "./PriceFilter";
import { useRouter } from "next/navigation";
import ButtonArrow from "@/_components/SVGs/ButtonArrow";
import LightCircle from "@/_components/SVGs/LightCircle";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

interface Props {
  Locations?: RegionsWidget[];
  Categories?: { id: number; name: string }[];
  Conditions: { id: number; name: string }[];
  Energies: { id: number; name: string }[];
  selectedLocation: { id: number; name: string }[];
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<{ id: number; name: string }[]>
  >;
  selectedCategory: { id: number; name: string }[];
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<{ id: number; name: string }[]>
  >;
  selectedCondition?: { id: number; name: string }[];
  setSelectedCondition?: React.Dispatch<
    React.SetStateAction<{ id: number; name: string }[]>
  >;
  selectedEnergy?: { id: number; name: string }[];
  setSelectedEnergy?: React.Dispatch<
    React.SetStateAction<{ id: number; name: string }[]>
  >;
  selectedKeyword: string | null;
  setSelectedKeyword: React.Dispatch<React.SetStateAction<string | null>>;
  selectedBedrooms?: number[];
  setSelectedBedrooms?: React.Dispatch<React.SetStateAction<number[]>>;
  selectedBathrooms?: number[];
  setSelectedBathrooms?: React.Dispatch<React.SetStateAction<number[]>>;
  openFilter: string | null;
  setOpenFilter: React.Dispatch<React.SetStateAction<string | null>>;
  priceRange: { min: string; max: string };
  setPriceRange: React.Dispatch<
    React.SetStateAction<{ min: string; max: string }>
  >;
  onApplyPrice: () => void;
  onResetPrice: () => void;
  onGoToProperties?: boolean;
}

export default function Filter({
  Locations,
  selectedLocation,
  setSelectedLocation,
  openFilter,
  setOpenFilter,
  Categories,
  selectedCategory,
  setSelectedCategory,
  Conditions,
  selectedCondition,
  setSelectedCondition,
  Energies,
  selectedEnergy,
  setSelectedEnergy,
  selectedKeyword,
  setSelectedKeyword,
  selectedBedrooms,
  setSelectedBedrooms,
  selectedBathrooms,
  setSelectedBathrooms,
  priceRange,
  setPriceRange,
  onApplyPrice,
  onResetPrice,
  onGoToProperties,
}: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [liveResults, setLiveResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const searchData = async () => {
      if (selectedKeyword && selectedKeyword.length > 2) {
        setLoading(true);
        try {
          // Aapka live backend URL use ho raha hai
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/properties?keyword=${selectedKeyword}`,
          );
          const data = await res.json();
          setLiveResults(data.data || []); // Laravel structure ke mutabiq
        } catch (err) {
          console.error("Search Error:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setLiveResults([]);
      }
    };

    const timer = setTimeout(searchData, 500); // 0.5 sec wait karega typing ke baad
    return () => clearTimeout(timer);
  }, [selectedKeyword]);

  const [moreFilterset, setMoreFilter] = useState(false);
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const toggleValue = (
    arr: { id: number; name: string }[],
    value: { id: number; name: string } | null,
    setFn: (v: { id: number; name: string }[]) => void,
  ) => {
    if (value === null) {
      setFn([]);
      return;
    }

    const exists = arr.some((v) => v.id === value.id);
    if (exists) {
      setFn(arr.filter((v) => v.id !== value.id));
    } else {
      setFn([...arr, value]);
    }
  };
  const handleGoToProperties = () => {
    const query = new URLSearchParams();

    if (selectedKeyword) query.set("keyword", selectedKeyword);
    if (selectedLocation.length)
      query.set("locations", selectedLocation.map((l) => l.id).join(","));
    if (selectedCategory.length)
      query.set("categories", selectedCategory.map((c) => c.id).join(","));
    if (selectedCondition && selectedCondition.length)
      query.set("conditions", selectedCondition.map((c) => c.id).join(","));
    if (selectedEnergy && selectedEnergy.length)
      query.set("energies", selectedEnergy.map((e) => e.id).join(","));
    if (selectedBedrooms && selectedBedrooms.length)
      query.set("bedrooms", selectedBedrooms.join(","));
    if (selectedBathrooms && selectedBathrooms.length)
      query.set("bathrooms", selectedBathrooms.join(","));
    if (priceRange.min) query.set("minPrice", priceRange.min);
    if (priceRange.max) query.set("maxPrice", priceRange.max);

    router.push(
      `${locale === "en" ? "" : "/ar"}/properties?${query.toString()}`,
    );
  };
  return (
    <div className="relative  z-10 space-y-10">
      <div
        className={`${moreFilterset ? "flex-wrap" : ""} flex gap-2 ${onGoToProperties ? "l:flex-row flex-col" : ""} `}
      >
        <input
          type="text"
          placeholder={t("filter.keyword")}
          className="border border-gray-300 rounded-md px-3 outline-none py-[11px] text-base font-medium placeholder:text-secondary text-secondary"
          value={selectedKeyword || ""}
          onChange={(e) => {
            setSelectedKeyword(e.target.value);
            setShowDropdown(true); // Typing par dropdown khul jaye
          }}
          onFocus={() => setShowDropdown(true)} // Click karne par dropdown khul jaye
          // Blur par thora delay rakhen taake click register ho sake
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />

        {/* Dropdown sirf tab dikhay jab showDropdown TRUE ho */}
        {showDropdown && selectedKeyword && liveResults.length > 0 && (
          <div className="absolute top-[calc(100%+5px)] left-0 bg-white border border-gray-300 shadow-xl rounded-md z-[100] max-h-60 overflow-y-auto overflow-x-hidden">
            {liveResults.map((item: any) => (
              <div
                key={item.id}
                className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 flex flex-col justify-center"
                onClick={() => {
                  setSelectedKeyword(item.title || item.code);
                  setLiveResults([]); // Data khali kar den
                  setShowDropdown(false); // Dropdown sakhti se band kar den
                }}
              >
                <p className="text-[13px] font-semibold text-primary truncate w-full">
                  {item.title}
                </p>
                <p className="text-[10px] text-secondary truncate w-full">
                  Code: {item.code} • {item.category?.name || "Property"}
                </p>
              </div>
            ))}
          </div>
        )}

        {Locations && Locations.length > 0 && (
          <ListFilter
            key="location"
            id="location"
            uniqueCategoryNamesArray={Locations ?? []}
            selected={selectedLocation ?? []}
            Title={t("filter.locations")}
            onToggle={(value) =>
              toggleValue(selectedLocation ?? [], value, setSelectedLocation!)
            }
            open={openFilter === "location"}
            setOpen={setOpenFilter}
            Homepage={onGoToProperties}
            fullWidth={moreFilterset}
          />
        )}

        {Categories && Categories.length > 0 && (
          <ListFilter
            key="category"
            id="category"
            uniqueCategoryNamesArray={Categories ?? []}
            selected={selectedCategory ?? []}
            Title={t("filter.category")}
            onToggle={(value) =>
              toggleValue(selectedCategory ?? [], value, setSelectedCategory!)
            }
            open={openFilter === "category"}
            setOpen={setOpenFilter}
            Homepage={onGoToProperties}
            fullWidth={moreFilterset}
          />
        )}
        {moreFilterset && (
          <>
            {Conditions && Conditions.length > 0 && (
              <ListFilter
                key="condition"
                id="condition"
                uniqueCategoryNamesArray={Conditions ?? []}
                selected={selectedCondition ?? []}
                Title={t("filter.condition")}
                onToggle={(value) =>
                  toggleValue(
                    selectedCondition ?? [],
                    value,
                    setSelectedCondition!,
                  )
                }
                open={openFilter === "condition"}
                setOpen={setOpenFilter}
                fullWidth={moreFilterset}
              />
            )}
            {Energies && Energies.length > 0 && (
              <ListFilter
                key="energy"
                id="energy"
                uniqueCategoryNamesArray={Energies ?? []}
                selected={selectedEnergy ?? []}
                Title={t("filter.energy")}
                onToggle={(value) =>
                  toggleValue(selectedEnergy ?? [], value, setSelectedEnergy!)
                }
                open={openFilter === "energy"}
                setOpen={setOpenFilter}
                fullWidth={moreFilterset}
              />
            )}
          </>
        )}
        {!onGoToProperties && (
          <BedBathFilter
            id="bedbath"
            open={openFilter}
            setOpen={setOpenFilter}
            selectedBedrooms={selectedBedrooms}
            setSelectedBedrooms={setSelectedBedrooms}
            selectedBathrooms={selectedBathrooms}
            setSelectedBathrooms={setSelectedBathrooms}
            fullWidth={moreFilterset}
          />
        )}

        <PriceFilter
          id="price"
          open={openFilter}
          setOpen={setOpenFilter}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          onApplyPrice={onApplyPrice}
          onResetPrice={onResetPrice}
          Homepage={onGoToProperties}
          fullWidth={moreFilterset}
        />
        {!onGoToProperties && (
          <>
            {moreFilterset ? (
              <button
                className="border whitespace-nowrap border-gray-300 rounded-md px-4 outline-none py-2 md:w-fit w-full justify-center text-base font-medium  text-secondary flex items-center gap-2.5"
                onClick={() => setMoreFilter(!moreFilterset)}
              >
                <span className="w-4 h-4">
                  <FilterIcon />
                </span>
                {t("filter.less_filter")}
              </button>
            ) : (
              <button
                className="border whitespace-nowrap border-gray-300 rounded-md px-4 outline-none py-2 w-fit text-base font-medium  text-secondary flex items-center gap-2.5"
                onClick={() => setMoreFilter(!moreFilterset)}
              >
                <span className="w-4 h-4">
                  <FilterIcon />
                </span>
                {t("filter.more_filter")}
              </button>
            )}
          </>
        )}
        {onGoToProperties && (
          <div>
            <button
              onClick={handleGoToProperties}
              className="text-white bg-black flex rounded-full text-base font-medium gap-3  py-3.5 px-[45px] overflow-hidden l:w-fit w-full justify-center"
            >
              <span className="w-[52px] h-[52px] absolute start-0 rounded-full overflow-hidden">
                <LightCircle />
              </span>
              <span className="w-6 h-6">
                <ButtonArrow />
              </span>
              {t("filter.view_properties")}
            </button>
          </div>
        )}
      </div>

      {!moreFilterset && !onGoToProperties && (
        <div className="flex gap-2 flex-wrap">
          {selectedLocation.map((loc) => (
            <button
              onClick={() =>
                toggleValue(selectedLocation, loc, setSelectedLocation)
              }
              className="bg-Gray10 text-secondary text-sm font-extralight py-0.5 px-1.5 rounded-[4px] flex gap-0.5 items-center"
              key={loc.id}
            >
              {loc.name}
              <span className="w-3 h-3">
                <Close />
              </span>
            </button>
          ))}
          {selectedCategory.map((loc) => (
            <button
              onClick={() =>
                toggleValue(selectedCategory, loc, setSelectedCategory)
              }
              className="bg-Gray10 text-secondary text-sm font-extralight py-0.5 px-1.5 rounded-[4px] flex gap-0.5 items-center"
              key={loc.id}
            >
              {loc.name}
              <span className="w-3 h-3">
                <Close />
              </span>
            </button>
          ))}
          {selectedCondition &&
            setSelectedCondition &&
            selectedCondition.map((loc) => (
              <button
                onClick={() =>
                  toggleValue(selectedCondition, loc, setSelectedCondition)
                }
                className="bg-Gray10 text-secondary text-sm font-extralight py-0.5 px-1.5 rounded-[4px] flex gap-0.5 items-center"
                key={loc.id}
              >
                {loc.name}
                <span className="w-3 h-3">
                  <Close />
                </span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
