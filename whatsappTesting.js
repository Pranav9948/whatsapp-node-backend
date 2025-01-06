import dayjs from "dayjs";
import colors from "colors";

const stayInfo = {
  1: [
    {
      uniqueId: "douj2uvp6rs",
      id: 1,
      roomTypeId: 1,
      name: "Deluxe Ocean View Room",
      adult: 3,
      child: 0,
      infant: 4,
      toddler: 3,
      minPax: 1,
      maxPax: 3,
      extraBed: true,
      extraBedMaxPax: 2,
      adultPrice: 2001,
      childPrice: 0,
      infantPrice: 0,
      toddlerPrice: 0,
      totalRoomAmount: 2001,
      pricing: {
        id: 3,
        uuid: "826b77e5-3d28-4a48-b403-a51f1967fa1d",
        package_option_id: 1,
        package_type: "vendor",
        charge_type: "per_room",
        charge_pax_count: "triple",
        applicable_pax: ["adult", "child"],
        adult_resident_price: 2000,
        adult_non_resident_price: 3000,
        child_resident_price: 0,
        child_non_resident_price: 0,
        infant_resident_price: 0,
        infant_non_resident_price: 0,
        toddler_resident_price: 0,
        toddler_non_resident_price: 0,
        adult_resident_add_night_price: 1,
        adult_resident_extra_bed_price: 1,
        adult_non_resident_add_night_price: 1,
        adult_non_resident_extra_bed_price: 1,
        child_resident_add_night_price: 0,
        child_resident_extra_bed_price: 0,
        child_non_resident_add_night_price: 0,
        child_non_resident_extra_bed_price: 0,
        infant_resident_add_night_price: 0,
        infant_resident_extra_bed_price: 0,
        infant_non_resident_add_night_price: 0,
        infant_non_resident_extra_bed_price: 0,
        toddler_resident_add_night_price: 0,
        toddler_resident_extra_bed_price: 0,
        toddler_non_resident_add_night_price: 0,
        toddler_non_resident_extra_bed_price: 0,
        additional_night_price: null,
        group_extra_bed_price: null,
        non_resident: true,
        group_max_pax_count: null,
        group_amount: null,
        vendor_room_type_id: 1,
        vendor_id: 6,
        createdAt: "2025-01-02T15:26:36.702Z",
        updatedAt: "2025-01-02T15:26:36.702Z",
      },
    },
    {
      uniqueId: "e54c4dugqv9",
      id: 1,
      roomTypeId: 1,
      name: "Deluxe Ocean View Room",
      adult: 3,
      child: 0,
      infant: 4,
      toddler: 3,
      minPax: 1,
      maxPax: 3,
      extraBed: true,
      extraBedMaxPax: 2,
      adultPrice: 2001,
      childPrice: 0,
      infantPrice: 0,
      toddlerPrice: 0,
      totalRoomAmount: 2001,
      pricing: {
        id: 3,
        uuid: "826b77e5-3d28-4a48-b403-a51f1967fa1d",
        package_option_id: 1,
        package_type: "vendor",
        charge_type: "per_room",
        charge_pax_count: "triple",
        applicable_pax: ["adult", "child"],
        adult_resident_price: 2000,
        adult_non_resident_price: 3000,
        child_resident_price: 0,
        child_non_resident_price: 0,
        infant_resident_price: 0,
        infant_non_resident_price: 0,
        toddler_resident_price: 0,
        toddler_non_resident_price: 0,
        adult_resident_add_night_price: 1,
        adult_resident_extra_bed_price: 1,
        adult_non_resident_add_night_price: 1,
        adult_non_resident_extra_bed_price: 1,
        child_resident_add_night_price: 0,
        child_resident_extra_bed_price: 0,
        child_non_resident_add_night_price: 0,
        child_non_resident_extra_bed_price: 0,
        infant_resident_add_night_price: 0,
        infant_resident_extra_bed_price: 0,
        infant_non_resident_add_night_price: 0,
        infant_non_resident_extra_bed_price: 0,
        toddler_resident_add_night_price: 0,
        toddler_resident_extra_bed_price: 0,
        toddler_non_resident_add_night_price: 0,
        toddler_non_resident_extra_bed_price: 0,
        additional_night_price: null,
        group_extra_bed_price: null,
        non_resident: true,
        group_max_pax_count: null,
        group_amount: null,
        vendor_room_type_id: 1,
        vendor_id: 6,
        createdAt: "2025-01-02T15:26:36.702Z",
        updatedAt: "2025-01-02T15:26:36.702Z",
      },
    },
  ],
};

const pkgDetailsInfo = {
  id: "",
  uuid: "",
  name: "",
  packageType: "",
  checkIn: "2025-01-06T18:30:00.000Z",
  checkOut: "2025-01-09T18:30:00.000Z",
  roomCounts: 2,
  totalAdult: 0,
  totalChild: 0,
  totalInfant: 0,
  totalToddler: 0,
  totalAmount: 0,
  packageOption: {
    id: 1,
    uuid: "3a328d92-b707-48b8-b7ce-c4f8e8db348b",
    package_id: 1,
    name: "3 Days and 2 Nights",
    nights: "2",
    check_in_occurrence: "daily",
    package_price_type: "per_room",
    occurrence_days: [],
    agent_id: 1,
    include_notes:
      "<ul><li>Welcome drink upon arrival</li><li>Daily housekeeping</li><li>Complimentary breakfast for 2 adults</li></ul>",
    exclude_notes:
      "<ul><li>Spa services and treatments are not included</li><li>Late check-out fees</li><li>Alcoholic beverages are not included in the package</li></ul>",
    special_notes:
      "<ul><li>Early check-in and late check-out are subject to availability and may incur extra charges</li><li>Pet-friendly room available upon request (additional charge applies)</li></ul>",
    status: true,
    createdAt: "2025-01-02T15:12:53.682Z",
    updatedAt: "2025-01-02T15:29:07.768Z",
    deletedAt: null,
    PkgOptionDays: [
      {
        id: 1,
        uuid: "3b755835-3edb-421a-b0e4-d77f43993b90",
        package_option_id: 1,
        day_name: "Day 1",
        day_order: "1",
        createdAt: "2025-01-02T15:12:53.699Z",
        updatedAt: "2025-01-02T15:12:53.699Z",
        deletedAt: null,
        AgentPkgOptionDaysActivity: [
          {
            id: 1,
            uuid: "443619dd-4028-4b0f-9351-7cd025f6306a",
            package_option_id: 1,
            package_option_day_id: 1,
            activity_name: "City Sightseeing Tour",
            time: 2,
            description:
              "Visit local landmarks such as temples, historic forts, and scenic viewpoints. A guided tour will give you insights into the area's history and culture.",
            vendor_id: 6,
            createdAt: "2025-01-02T15:18:07.071Z",
            updatedAt: "2025-01-02T15:18:07.071Z",
          },
        ],
        packageTransports: [
          {
            id: 1,
            uuid: "bad5d0d4-7402-404a-bb97-cfcecb786ccb",
            package_option_id: 1,
            package_option_day_id: 1,
            transport_type: "boat",
            system_vendor: true,
            transport_vendor_id: 2,
            transport_vendor_name: "Ocean Breeze Boat Services",
            pickup_time: "08:50",
            pickup_location: "Pickup from the airport by TravelPro Ltd.",
            description:
              " A luxury boat ride that will take you on a scenic journey along the coastline. Enjoy sunset views while sipping on refreshing beverages.",
            createdAt: "2025-01-02T15:20:52.362Z",
            updatedAt: "2025-01-02T15:20:52.362Z",
          },
        ],
        PkgOptionStays: [],
      },
      {
        id: 2,
        uuid: "e8a84939-ca1a-4bab-be02-67585c56fb2f",
        package_option_id: 1,
        day_name: "Day 2",
        day_order: "2",
        createdAt: "2025-01-02T15:12:53.699Z",
        updatedAt: "2025-01-02T15:12:53.699Z",
        deletedAt: null,
        AgentPkgOptionDaysActivity: [
          {
            id: 2,
            uuid: "e6f0ebdd-2055-40df-8e9f-3c63ae91b513",
            package_option_id: 1,
            package_option_day_id: 2,
            activity_name: "Cultural Dance Performance",
            time: 3,
            description:
              "In the evening, enjoy a traditional dance performance by local artists, showcasing vibrant costumes and music.",
            vendor_id: 6,
            createdAt: "2025-01-02T15:18:33.897Z",
            updatedAt: "2025-01-02T15:18:33.897Z",
          },
        ],
        packageTransports: [
          {
            id: 2,
            uuid: "60ef8528-ccc6-4323-bd01-89fd0f02fdc4",
            package_option_id: 1,
            package_option_day_id: 2,
            transport_type: "land",
            system_vendor: true,
            transport_vendor_id: 1,
            transport_vendor_name: "Globetrotter Getaways",
            pickup_time: "07:00",
            pickup_location: "Trek to Nearby Waterfall",
            description:
              " A local guide will meet you at the resort and take you to the start of the scenic trek. Comfortable, off-road vehicle provided for the journey to the trailhead.",
            createdAt: "2025-01-02T15:22:08.497Z",
            updatedAt: "2025-01-02T15:22:08.497Z",
          },
        ],
        PkgOptionStays: [],
      },
      {
        id: 3,
        uuid: "89390861-57bc-47b3-80f5-e8f410d37760",
        package_option_id: 1,
        day_name: "Day 3",
        day_order: "3",
        createdAt: "2025-01-02T15:12:53.699Z",
        updatedAt: "2025-01-02T15:12:53.699Z",
        deletedAt: null,
        AgentPkgOptionDaysActivity: [
          {
            id: 3,
            uuid: "80e10783-01ee-4090-8a4c-b01a110147f9",
            package_option_id: 1,
            package_option_day_id: 3,
            activity_name: "Morning Snorkeling Excursion",
            time: 4,
            description:
              "Embark on a snorkeling excursion to explore the rich marine life in the crystal-clear waters. Equipment and guidance provided.",
            vendor_id: 6,
            createdAt: "2025-01-02T15:18:58.346Z",
            updatedAt: "2025-01-02T15:18:58.346Z",
          },
        ],
        packageTransports: [
          {
            id: 3,
            uuid: "2a57f111-baca-4f05-aadb-03b108cec4d3",
            package_option_id: 1,
            package_option_day_id: 3,
            transport_type: "land",
            system_vendor: true,
            transport_vendor_id: 1,
            transport_vendor_name: "Globetrotter Getaways",
            pickup_time: "23:55",
            pickup_location: "Pickup from the resort",
            description:
              "  A dedicated van will pick you up and take you to the snorkeling location. Equipment will be provided for the excursion, which includes professional guides to ensure safety and a memorable experience.",
            createdAt: "2025-01-02T15:23:06.871Z",
            updatedAt: "2025-01-02T15:23:06.871Z",
          },
        ],
        PkgOptionStays: [],
      },
    ],
    PkgOptionPrices: [
      {
        id: 1,
        uuid: "f15f09a4-fda1-4ce2-9219-f92917326337",
        package_option_id: 1,
        package_type: "vendor",
        charge_type: "per_room",
        charge_pax_count: "single",
        applicable_pax: ["adult", "child"],
        adult_resident_price: 1000,
        adult_non_resident_price: 2000,
        child_resident_price: 0,
        child_non_resident_price: 0,
        infant_resident_price: 0,
        infant_non_resident_price: 0,
        toddler_resident_price: 0,
        toddler_non_resident_price: 0,
        adult_resident_add_night_price: 1,
        adult_resident_extra_bed_price: 0,
        adult_non_resident_add_night_price: 1,
        adult_non_resident_extra_bed_price: 0,
        child_resident_add_night_price: 0,
        child_resident_extra_bed_price: 0,
        child_non_resident_add_night_price: 0,
        child_non_resident_extra_bed_price: 0,
        infant_resident_add_night_price: 0,
        infant_resident_extra_bed_price: 0,
        infant_non_resident_add_night_price: 0,
        infant_non_resident_extra_bed_price: 0,
        toddler_resident_add_night_price: 0,
        toddler_resident_extra_bed_price: 0,
        toddler_non_resident_add_night_price: 0,
        toddler_non_resident_extra_bed_price: 0,
        additional_night_price: null,
        group_extra_bed_price: null,
        non_resident: true,
        group_max_pax_count: null,
        group_amount: null,
        vendor_room_type_id: 1,
        vendor_id: 6,
        createdAt: "2025-01-02T15:26:36.702Z",
        updatedAt: "2025-01-02T15:26:36.702Z",
      },
      {
        id: 2,
        uuid: "e4da9c4f-cf64-47ca-98c7-cbee9d195f1f",
        package_option_id: 1,
        package_type: "vendor",
        charge_type: "per_room",
        charge_pax_count: "twin",
        applicable_pax: ["adult", "child"],
        adult_resident_price: 1200,
        adult_non_resident_price: 2200,
        child_resident_price: 0,
        child_non_resident_price: 0,
        infant_resident_price: 0,
        infant_non_resident_price: 0,
        toddler_resident_price: 0,
        toddler_non_resident_price: 0,
        adult_resident_add_night_price: 1,
        adult_resident_extra_bed_price: 1,
        adult_non_resident_add_night_price: 1,
        adult_non_resident_extra_bed_price: 1,
        child_resident_add_night_price: 0,
        child_resident_extra_bed_price: 0,
        child_non_resident_add_night_price: 0,
        child_non_resident_extra_bed_price: 0,
        infant_resident_add_night_price: 0,
        infant_resident_extra_bed_price: 0,
        infant_non_resident_add_night_price: 0,
        infant_non_resident_extra_bed_price: 0,
        toddler_resident_add_night_price: 0,
        toddler_resident_extra_bed_price: 0,
        toddler_non_resident_add_night_price: 0,
        toddler_non_resident_extra_bed_price: 0,
        additional_night_price: null,
        group_extra_bed_price: null,
        non_resident: true,
        group_max_pax_count: null,
        group_amount: null,
        vendor_room_type_id: 1,
        vendor_id: 6,
        createdAt: "2025-01-02T15:26:36.702Z",
        updatedAt: "2025-01-02T15:26:36.702Z",
      },
      {
        id: 3,
        uuid: "826b77e5-3d28-4a48-b403-a51f1967fa1d",
        package_option_id: 1,
        package_type: "vendor",
        charge_type: "per_room",
        charge_pax_count: "triple",
        applicable_pax: ["adult", "child"],
        adult_resident_price: 2000,
        adult_non_resident_price: 3000,
        child_resident_price: 0,
        child_non_resident_price: 0,
        infant_resident_price: 0,
        infant_non_resident_price: 0,
        toddler_resident_price: 0,
        toddler_non_resident_price: 0,
        adult_resident_add_night_price: 1,
        adult_resident_extra_bed_price: 1,
        adult_non_resident_add_night_price: 1,
        adult_non_resident_extra_bed_price: 1,
        child_resident_add_night_price: 0,
        child_resident_extra_bed_price: 0,
        child_non_resident_add_night_price: 0,
        child_non_resident_extra_bed_price: 0,
        infant_resident_add_night_price: 0,
        infant_resident_extra_bed_price: 0,
        infant_non_resident_add_night_price: 0,
        infant_non_resident_extra_bed_price: 0,
        toddler_resident_add_night_price: 0,
        toddler_resident_extra_bed_price: 0,
        toddler_non_resident_add_night_price: 0,
        toddler_non_resident_extra_bed_price: 0,
        additional_night_price: null,
        group_extra_bed_price: null,
        non_resident: true,
        group_max_pax_count: null,
        group_amount: null,
        vendor_room_type_id: 1,
        vendor_id: 6,
        createdAt: "2025-01-02T15:26:36.702Z",
        updatedAt: "2025-01-02T15:26:36.702Z",
      },
    ],
  },
  rooms: [],
};

const pkgDetails = {
  id: 1,
  uuid: "328288b7-fc7c-4a38-9a85-be39022a9d3c",
  package_type: "vendor",
  available_from: "2025-01-07T00:00:00.000Z",
  available_to: "2025-01-10T00:00:00.000Z",
  name: "Cultural Heritage Tour of Rajasthan",

  destination: "goa",
  agent_id: 1,
  vendor_id: 6,
  allow_child: true,
  extra_bed: true,
  completion_percentage: 100,
  status: true,
  createdAt: "2025-01-02T15:12:53.675Z",
  updatedAt: "2025-01-02T15:29:07.799Z",
  deletedAt: null,
  Tags: [
    {
      tag_name: "Family-Friendly",
      id: 2,
      agent_package_tags: {
        agent_tag_id: 2,
      },
    },
    {
      tag_name: "Budget-Friendly",
      id: 3,
      agent_package_tags: {
        agent_tag_id: 3,
      },
    },
  ],
};

const getTotal = (rooms, key) =>
  rooms?.length > 0 ? rooms.reduce((total, room) => total + room[key], 0) : 0;

const currencyFormatter = (amount = 0) =>
  parseFloat(amount || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

let bookingDetailsArray = [];

if (stayInfo && Object.keys(stayInfo).length > 0) {
  bookingDetailsArray = Object.keys(stayInfo).map((key) => ({
    packageName: pkgDetails?.name || "Package Option Not Available",
    customerName: "Pranav",
    checkIn: dayjs(pkgDetails.available_from).format("DD MMM YYYY"),
    checkOut: dayjs(pkgDetails.available_to).format("DD MMM YYYY"),
    roomType: stayInfo[key][0]?.name || "Room type not available",
    roomCount: stayInfo[key]?.length || 0,
    totalPrice: currencyFormatter(
      getTotal(stayInfo[key], "totalRoomAmount") || 0
    ),
    adultCount: getTotal(stayInfo[key], "adult"),
    childCount: getTotal(stayInfo[key], "child"),
    toddlerCount: getTotal(stayInfo[key], "toddler"),
    infantCount: getTotal(stayInfo[key], "infant"),
  }));
}

const generateWhatsappMessage = (
  stayInfo,
  pkgDetails,
  pkgDetailsInfo,
  customerName = "Pranav"
) => {
  const packageName = pkgDetails?.name || "our service";
  const checkIn =
    pkgDetailsInfo.checkIn &&
    dayjs(pkgDetailsInfo.checkIn).format("DD MMM YYYY");
  const checkOut =
    pkgDetailsInfo.checkOut &&
    dayjs(pkgDetailsInfo.checkOut).format("DD MMM YYYY");

  const roomCount = pkgDetailsInfo?.roomCounts;

  if (Object.keys(stayInfo).length > 0) {
    const {
      totalPrice,
      adultCount,
      childCount,
      toddlerCount,
      infantCount,
      roomType,
    } = bookingDetailsArray[0];

    return `I'm interested in the "${packageName}" package. I'm planning a trip from ${checkIn} to ${checkOut} and require ${roomCount} rooms.

Here are the details:

- Package Name: ${packageName}
- Check-in Date: ${checkIn},
- Check-out Date: ${checkOut},
- Number of Rooms: ${roomCount},
- Room Type: ${roomType}
- Adults: ${adultCount}
- Children: ${childCount}
- Toddlers: ${toddlerCount}
- Infants: ${infantCount}
- Total Price: ${totalPrice}

Could you please confirm the availability and provide more information about the package inclusions, exclusions, and any applicable cancellation policies?`;
  } else {
    let message = `Hello, I am interested in booking ${packageName}.`;
    if (checkIn || checkOut || roomCount) {
      message += ` Here are the details of my stay:
${checkIn ? `- Check-in Date: ${checkIn}` : ""}
${checkOut ? `- Check-out Date: ${checkOut}` : ""}
${roomCount ? `- Number of Rooms: ${roomCount}` : ""}`;
    }

    // Default fallback for no stayInfo and minimal details
    if (!checkIn && !checkOut && !roomCount) {
      message += `\nPlease provide more information about the services or packages available.`;
    }

    return message.trim();
  }
};

const whatsappMessage = generateWhatsappMessage(
  stayInfo,
  pkgDetails,
  pkgDetailsInfo,bookingDetailsArray
);
console.log(colors.green(whatsappMessage));
