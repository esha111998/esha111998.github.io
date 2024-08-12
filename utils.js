function getPathAndLocation() {
  let path = window.location.pathname;
  let splittedPath = path.split("/");
  const finalPath = [splittedPath.at(-2), splittedPath.at(-1)].join("/"); //handled for both local and sever
  const cityOrLinkName = finalPath?.split("/")?.[1]?.split(".")?.[0];
  return { finalPath, cityOrLinkName };
}

const domain = "https://www.daynightpackersmovers.com/";
const brand = "#FF5823";

const blogsData = [
    {
      imgName: "best-packer-mover",
      imgAlt: "best packer mover",
      title: "Local Moving Guides",
      content:
        "Detailed guides highlighting key aspects of moving to specific neighbourhoods.",
      route: "local-moving-guides",
      date: "3 Aug, 24",
    },
    {
      imgName: "packed-material",
      imgAlt: "packed material",
      title: "Essential Moving Supplies",
      content:
        "Comprehensive list of necessary items for a smooth and organized move.",
      route: "essential-moving-supplies",
      date: "31 Jul, 24",
    },
    {
      imgName: "professional-packing-service",
      imgAlt: "professional packing service",
      title: "Customer Success Stories",
      content:
        "Real-life moving experiences showcasing successful and smooth relocations.",
      route: "customer-success-stories",
      date: "29 Jul, 24",
    },
    {
      imgName: "moving-with-pets",
      imgAlt: "moving with pets",
      title: "Moving with Pets",
      content:
        "Tips for ensuring a safe and smooth move with pets. Click to view more",
      route: "moving-with-pets",
      date: "15 Jul, 24",
    },
    {
      imgName: "front-view-smiley-delivery-woman-holding-boxes",
      imgAlt: "front view smiley delivery woman holding boxes",
      title: "Safely Packing",
      content:
        "Techniques for securely packing delicate items during a move. Click to view more",
      route: "safely-packing",
      date: "21 Jun, 24",
    },
    {
      imgName: "focused",
      imgAlt: "focused",
      title: "Moving Day Survival Kit",
      content:
        "Essential items to keep handy for a smooth moving day. Click to view more",
      route: "moving-day-survival-kit",
      date: "10 Jun, 24",
    },
    {
      imgName: "day-packing",
      imgAlt: "day packing",
      title: "Packing Electronics",
      content:
        "Protecting and organizing electronic devices during relocation.",
      route: "packing-electronics",
      date: "30 May, 24",
    },
    {
      imgName: "checklist",
      imgAlt: "checklist",
      title: "Storage Solutions",
      content:
        "Deciding what to move and finding effective storage options. Click to view more",
      route: "storage-solution",
      date: "19 May, 24",
    },
    {
      imgName: "counting-boxes",
      imgAlt: "counting-boxes",
      title: "Moving Estimates",
      content:
        "How to interpret moving quotes and estimate costs accurately. Click to view more",
      route: "moving-estimates",
      date: "16 Apr, 24",
    },
    {
      imgName: "shifting-sofa",
      imgAlt: "shifting sofa",
      title: "Budgeting the Move",
      content:
        "Tips and strategies for managing moving expenses and staying on budget.",
      route: "budgeting-the-move",
      date: "7 Apr, 24",
    },
    {
      imgName: "tools",
      imgAlt: "tools",
      title: "DIY Moving",
      content:
        "Planning and executing a successful move without professional help.",
      route: "diy-moving",
      date: "26 Mar, 24",
    },
    {
      imgName: "consulting",
      imgAlt: "consulting",
      title: "Moving in Bad Weather",
      content:
        "Tips for safely handling your move during adverse weather conditions.",
      route: "moving-in-bad-weather",
      date: "11 Mar, 24",
    },
    {
      imgName: "trusted-packers-movers",
      imgAlt: "trusted packers movers",
      title: "Decluttering Before Move",
      content:
        "Effective strategies for reducing clutter before relocating to a new home.",
      route: "decluttering-before-move",
      date: "19 Feb, 24",
    },
    {
      imgName: "front-view-smiley-delivery-man-holding-boxes",
      imgAlt: "front view smiley delivery man holding boxes",
      title: "Organizing New Location",
      content:
        "Tips for setting up and organizing your new space efficiently. Click to view more",
      route: "organizing-new-location",
      date: "1 Feb, 24",
    },
    {
      imgName: "guiding-team",
      imgAlt: "guiding team",
      title: "Eco-Friendly Moving",
      content:
        "Sustainable moving practices and tips for reducing environmental impact.",
      route: "eco-friendly-moving",
      date: "27 Jan, 24",
    },
    {
      imgName: "kitchen-items",
      imgAlt: "kitchen items",
      title: "Label Boxes",
      content:
        "Effective box labelling techniques for an organized and easy unpacking.",
      route: "label-boxes",
      date: "11 Jan, 24",
    },
    {
      imgName: "long-distance-moving",
      imgAlt: "long distance moving",
      title: "Long Distance Moving",
      content:
        "Essential tips and considerations for a smooth long-distance move. Click to view more",
      route: "long-distance-moving",
      date: "22 Dec, 23",
    },
    {
      imgName: "why-choose-us",
      imgAlt: "Why Us",
      title: "Why Choose Us",
      content:
        "Key factors and questions to select a reliable moving company. Click to view more",
      route: "why-us",
      date: "7 Dec, 23",
    },
    {
      imgName: "packing-tips",
      imgAlt: "packing tips",
      title: "Packing Tips",
      content:
        "Efficient packing methods to maximize space and protect belongings.",
      route: "packing-tips",
      date: "17 Nov, 23",
    },
    {
      imgName: "check-list",
      imgAlt: "checklist",
      title: "Ultimate Checklist",
      content:
        "Professional packing, transport, and unpacking for hassle-free relocations.",
      route: "ultimate-checklist",
      date: "2 Nov, 23",
    },
  ];