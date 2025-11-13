export const defaultValues = {
  gender: "Male",
  ownershipType: "Single Proprietorship",
  typeOfOccupancy: "Owned",
  barangay: "Biasong",
  busbarangay: "Biasong",
  propertybarangay: "Biasong",
  city: "City of Talisay",
  citizenship: "Philippines (the)",
};

export const barangayOptions = [
  "Biasong",
  "Bulacao",
  "Cadulawan",
  "Camp IV",
  "Cansojong",
  "Dumlog",
  "Jaclupan",
  "Lagtang",
  "Lawaan I",
  "Lawaan II",
  "Lawaan III",
  "Linao",
  "Maghaway",
  "Manipis",
  "Mohon",
  "Poblacion",
  "Pooc",
  "San Isidro",
  "San Roque",
  "Tabunok",
  "Tangke",
  "Tapul",
];

export function getSections(countries = []) {
  return {
    "Personal Information": [
      { name: "firstName", label: "First Name", required: true },
      { name: "middleName", label: "Middle Name" },
      { name: "lastName", label: "Last Name", required: true },
      { name: "suffix", label: "Suffix" },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        options: ["Male", "Female", "Other"],
        required: true,
      },
      { name: "street", label: "Street", required: true },
      {
        name: "barangay",
        label: "Barangay",
        type: "select",
        options: barangayOptions, // import your barangayOptions if needed
        required: true,
      },
      { name: "city", label: "City", required: true },
      {
        name: "contactNumber",
        label: "Contact Number",
        required: true,
        pattern: /^[0-9]{10,11}$/,
      },
      {
        name: "emailAddress",
        label: "Email Address",
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      { name: "tin", label: "TIN" },
      {
        name: "citizenship",
        label: "Citizenship",
        type: "select",
        // 👇 Dynamically set options from fetched countries
        options: countries.map((c) => c.country),
        required: true,
      },
    ],

    "Business Information": [
      { name: "businessName", label: "Business / Trade Name", required: true },
      { name: "typeOfBusiness", label: "Type of Business" },
      { name: "businessAddress", label: "Business Address" },
      { name: "busstreet", label: "Street", required: true },
      {
        name: "busbarangay",
        label: "Barangay",
        type: "select",
        options: barangayOptions, // import your barangayOptions if needed
        required: true,
      },
      { name: "buscity", label: "City", required: true },
      {
        name: "ownershipType",
        label: "Ownership Type",
        type: "select",
        options: [
          "Single Proprietorship",
          "Partnership",
          "Corporation",
          "Cooperative",
          "Others",
        ],
      },
      {
        name: "areaOccupied",
        label: "Area Occupied (sqm)",
        type: "number",
        min: 0,
      },
      { name: "floorLevel", label: "Floor Level" },
    ],

    "Property Details": [
      { name: "lotNumber", label: "Lot / Block Number" },
      { name: "propertyStreet", label: "Street", required: true },
      {
        name: "propertybarangay",
        label: "Barangay",
        type: "select",
        options: barangayOptions, // import your barangayOptions if needed
        required: true,
      },
      { name: "propertyCity", label: "City", required: true },
      {
        name: "typeOfOccupancy",
        label: "Type of Occupancy",
        type: "select",
        options: ["Owned", "Rented", "Leased", "Others"],
      },
      { name: "lotOwner", label: "Name of Lot Owner" },
      //   {
      //     name: "landUseClassification",
      //     label:
      //       "Land Use Classification (e.g. Commercial, Residential, Industrial)",
      //   },
      //   { name: "zoningClassification", label: "Zoning Classification" },
      {
        name: "maleemployees",
        label: "Number of Male Employees",
        type: "number",
        min: 0,
      },
      {
        name: "femaleemployees",
        label: "Number of Female Employees",
        type: "number",
        min: 0,
      },
      {
        name: "projectCost",
        label: "Project Cost / Investment",
        type: "number",
        min: 0,
      },
    ],
  };
}
