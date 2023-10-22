"use client";
import data from "./src/mockData/products";
import Image from "next/image";
import {
  Button,
  Navbar,
  Typography,
  ThemeProvider,
  Card,
  CardHeader,
  CardBody,
  Input,
  Rating,
  ButtonGroup,
  Select,
  Option,
  Drawer,
  Checkbox,
  Radio,
} from "./src/index";
import React from "react";
import { RatedIcon, UnratedIcon } from "./src/Icons/Star";
import Link from "next/link";
import Head from "next/head";

interface IITEM {
  city: string;
  country: string;
  superHost: boolean;
  title: string;
  rating: number;
  maxGuests: number;
  type: string;
  beds: number | null;
  photo: string;
}
export default function Home() {
  const [openNav, setOpenNav] = React.useState(false);
  const [Mockdata, setMockdata] = React.useState(data);
  const [loc, setLoc] = React.useState(Mockdata[0]?.country || "");
  const [openTop, setOpenTop] = React.useState(false);

  return (
    <ThemeProvider>
      <Head>
        {/* <link rel="icon" href={require("./../public/vector/default.svg")} /> */}
      </Head>
      <div className="w-full">
        {/* Navbars */}
        <Navbar className="sticky top-0 shadow-sm z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
          <div className="flex items-center justify-between text-blue-gray-900">
            <Link
              href="/"
              className="mr-4 text-2xl cursor-pointer py-1.5 font-medium"
            >
              <Image
                src={require("../public/vector/default-monochrome.svg")}
                alt="RoomNest"
                height={150}
                width={150}
                className="h-auto w-36"
              />
            </Link>
            <div className="lg:flex hidden items-center gap-4">
              <NavAction setOpenTop={setOpenTop} />
            </div>
          </div>
        </Navbar>
        <div className="mt-10 ">
          <div className="lg:hidden mb-10 flex justify-center items-center gap-4">
            <NavAction setOpenTop={setOpenTop} />
          </div>
          <div className="flex my-5 px-16 items-center justify-between w-full">
            <Typography className="" variant="h4">
              Roam in Finland
            </Typography>
            <Typography variant="small">{Mockdata.length}+ Roams</Typography>
          </div>
          <div className="flex sm:px-10 items-center justify-center w-full">
            {Mockdata.length < 1 && <div className="">No Result Found</div>}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-start justify-center">
              {Mockdata.map((item: IITEM, idx: number) => {
                return <BlogCard key={idx} {...item} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <footer className="flex w-full mt-7 flex-row flex-wrap items-center py-4 justify-center text-center">
        <Typography color="blue-gray" className="font-normal">
          &copy; 2023 RoamNest <span className="font-bold">created by</span>{" "}
          <Link
            href={"https://www.github.com/feelchi1star"}
            className="text-purple-500"
          >
            Feelchi1star
          </Link>
        </Typography>
      </footer>
      {openTop && (
        <div>
          <Drawer
            placement={"left"}
            overlay={false}
            open={openTop}
            onClose={() => setOpenTop(false)}
            className="p-4"
          >
            <Typography className="px-4 mb-6" variant="h3">
              Filter
            </Typography>
            <DNav
              setOpenTop={setOpenTop}
              data={data}
              setMockdata={setMockdata}
              Mockdata={Mockdata}
            />
          </Drawer>
        </div>
      )}
    </ThemeProvider>
  );
}

function DNav({
  Mockdata,
  setMockdata,
  data,
  setOpenTop,
}: {
  data: any;
  setMockdata: any;
  Mockdata: any;
  setOpenTop: any;
}) {
  const [searchText, setsearchText] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("");

  React.useEffect(() => {
    const filteredData = data.filter((item: any) => {
      return (
        item.title.toLowerCase().includes(searchText) ||
        item.type.toLowerCase().includes(searchText)
      );
    });

    console.log(filteredData);
    setMockdata(filteredData);
  }, [data, searchText, setMockdata]);

  return (
    <div className="grid  gap-x-14 gap-y-14 lg:pt-4 px-4 place-items-start">
      <div className=" w-full flex items-center justify-between">
        <Select
          size="md"
          variant="static"
          label="Select Location"
          selected={(element) =>
            element &&
            React.cloneElement(element, {
              disabled: true,
              className:
                "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
            })
          }
        >
          {Mockdata.map((item: IITEM, idx: number) => {
            return (
              <Option
                defaultChecked
                key={idx}
                onClick={() => setOpenTop(false)}
                value={"kkk k k"}
                className="flex items-center gap-2"
              >
                {item.country + ", " + item.city}
              </Option>
            );
          })}
        </Select>
      </div>

      <div className="flex gap-2 flex-col ">
        <Typography variant="h6">Guests</Typography>
        <div className="flex gap-2 flex-col">
          <Radio
            onChange={(e) => {
              setSelectedValue(e.target.value.toLowerCase());
            }}
            name="type"
            value={"1-3"}
            label="1 - 3 Beds"
          ></Radio>
          <Radio
            onChange={(e) => {
              setSelectedValue(e.target.value.toLowerCase());
            }}
            name="type"
            value={"4-6"}
            label="4 - 6 Beds"
          ></Radio>
          <Radio
            onChange={(e) => {
              setSelectedValue(e.target.value.toLowerCase());
            }}
            name="type"
            value={"7"}
            label="7+ Beds"
          ></Radio>
        </div>
      </div>
      <div className="flex w-full">
        <Input
          name="search"
          label="Search a property"
          variant="static"
          type="search"
          value={searchText}
          onChange={(e) => {
            setsearchText(e.target.value.toLowerCase());
          }}
          placeholder="Arty interior"
        ></Input>
      </div>

      <div className="flex items-center justify-center w-full">
        <Button className="hover:bg-black/50" onClick={() => setMockdata(data)}>
          Reset
        </Button>
      </div>
    </div>
  );
}

function NavAction({ setOpenTop }: { setOpenTop: (f: boolean) => void }) {
  return (
    <div className="flex items-center ">
      <ButtonGroup onClick={() => setOpenTop(true)}>
        <Button className="py-4 bg-stone-50 font-light text-stone-500 px-8">
          Finland Otuku
        </Button>
        <Button className="py-4 bg-stone-50 font-light text-stone-500 px-8">
          Guests
        </Button>
        <Button className="py-4  bg-stone-50 text-stone-500 px-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-purple-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </Button>
      </ButtonGroup>
    </div>
  );
}

function BlogCard({
  city,
  country,
  superHost,
  title,
  rating,
  maxGuests,
  type,
  beds,
  photo,
}: IITEM) {
  return (
    <Card className="max-w-[24rem] overflow-hidden shadow-none">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0  rounded-2xl"
      >
        <Image
          height={400}
          width={400}
          className="h-64"
          src={photo}
          alt="ui/ux review check"
        />
      </CardHeader>
      <CardBody className="py-3 px-1">
        <div className="flex mt-2 items-center justify-between gap-0">
          <Button variant="outlined" className="py-1 px-2">
            Super Host
          </Button>
          <Typography variant="small">{type}</Typography>
          {beds && <Typography variant="small">.{beds} beds</Typography>}
          <Rating
            ratedColor="deep-purple"
            value={Math.floor(rating)}
            readonly
            ratedIcon={<RatedIcon className="h-3 w-3" />}
            unratedIcon={<UnratedIcon className="h-3 w-3" />}
          />
        </div>
        <Typography className="mt-2" variant="h6" color="deep-purple">
          {title}
        </Typography>
      </CardBody>
      {/* <CardFooter className="flex items-center justify-between"></CardFooter> */}
    </Card>
  );
}

async function getData() {
  const res = await fetch("https://api.example.com/...");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
