import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icon } from "@iconify/react";
import ShowService from "./ShowService";
import HideService from "./HideService";
import ShowServiceSuccess from "./ShowServiceSuccess";
import HideServiceSuccess from "./HideServiceSuccess";

export default function ServiceDetails() {
  return (
    <div className="w-full p-6 min-h-screen">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-2 mb-6 text-primary-600 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <span className="text-2xl">
            <Icon icon="ph:arrow-left" />
          </span>
          <span className="font-semibold text-lg">Back to Services</span>
        </button>

        <Button className="bg-success-500 rounded-4xl py-6 px-5 text-white">
          <Icon icon="mdi:edit-outline" width="30" height="30" />
          Edit Availability
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-grey-700">Massage therapy</h2>
        <div className="flex gap-2">
          <Badge variant="secondary" className=" border border-grey-600 text-grey-700 bg-transparent rounded-4xl py-2 px-3">Self Care</Badge>
          <Badge variant="secondary" className=" border border-grey-600 text-grey-700 bg-transparent rounded-4xl py-2 px-3">Massage</Badge>
        </div>
      </div>

      <div className="flex gap-4 my-6 bg-error-50 w-full p-4 rounded-2xl">
        <div className="flex items-center">
          <Switch checked className="" />
        </div>
        <div className="flex flex-col justify-between text-grey-600">
          <p className="text-md font-bold">
            Hidden
          </p>
          <p className="text-sm">Prospective clients can not see this service</p>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-white rounded-lg p-4 shadow mb-6">
        <h3 className="text-xl font-bold text-grey-700 mb-3">Pricing</h3>

        <div className="flex item-ceter justify-between bg-grey-100 rounded-2xl p-4">
          <div className="flex items-center gap-5">
            <span>Type : <Badge className=" border border-grey-600 text-grey-700 bg-transparent rounded-4xl py-2 px-3">Fixed</Badge></span>
            <div>|</div>
            <span>Price/Session: <strong>₦1200</strong></span>
            <div>|</div>
            <span>Session Duration: <strong>2hrs</strong></span>
          </div>
          <Button variant="ghost" className="text-primary-500">
            <Icon icon="mdi:edit-outline" width="30" height="30" />Edit Pricing
          </Button>
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-white rounded-lg p-4 shadow mb-6">
        <div className="flex justify-between mb-2 items-center">
          <h3 className="text-xl font-bold text-grey-700 mb-3">Details</h3>
          <Button variant="ghost" className="text-primary-500">
            <Icon icon="mdi:edit-outline" width="30" height="30" />Edit Details
          </Button>
        </div>
        <ul className="list-disc list-inside text-gray-600 flex flex-col gap-2 item-ceter justify-between bg-grey-100 rounded-2xl p-4">
          <li>Deep tissue massage. We will punch you until you feel better. You may/may not see your ancestors.</li>
          <li>Slap your neck plenty times</li>
        </ul>
      </div>

      {/* Customer Reviews */}
      <div className="bg-white rounded-lg p-4 shadow">
        <div className="flex items-center mb-3 gap-2">
          <h3 className="text-xl font-bold text-grey-700">Customer Review</h3>
          <span className="font-normal">(12 Reviews)</span>
        </div>

        <div className="text-gray-600 flex gap-2 item-ceter justify-between bg-grey-100 rounded-2xl p-4 my-2">

          {/* Select Filter */}
          <div className="flex gap-2 items-center">
            <Select defaultValue="5">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by: 5 stars" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" disabled>Sort by: 5 stars</SelectItem>
                <SelectItem value="5">⭐ 5</SelectItem>
                <SelectItem value="4">⭐ 4</SelectItem>
                <SelectItem value="3">⭐ 3</SelectItem>
                <SelectItem value="2">⭐ 2</SelectItem>
                <SelectItem value="1">⭐ 1</SelectItem>
              </SelectContent>
            </Select>
            <p className="">12 Reviews</p>
          </div>

          <div className="flex items-center gap-2 text-yellow-500">
            <span className="text-xl font-extrabold text-black">4.5/5</span>
            <Icon icon="mdi:star" className="text-xl" />
            <Icon icon="mdi:star" className="text-xl" />
            <Icon icon="mdi:star" className="text-xl" />
            <Icon icon="mdi:star" className="text-xl" />
            <Icon icon="mdi:star-half-full" className="text-xl" />
          </div>

        </div>


        {/* Review Card */}
        {Array(4).fill(0).map((_, i, arr) => (
          <div
            key={i}
            className={`py-3 space-y-2 pb-5 ${i !== arr.length - 1 ? "border-b" : ""}`}
          >
            <p className="text-sm text-gray-500">12/12/2024</p>
            <h4 className="font-semibold">Hope O.</h4>
            <div className="flex text-yellow-500 mb-1 gap-2">
              {Array(4).fill(0).map((_, index) => (
                <Icon key={index} icon="mdi:star" className="text-lg" />
              ))}
              <Icon icon="mdi:star-outline" className="text-lg" />
            </div>
            <p className="text-sm text-gray-500">
              Size: <span className="font-medium">L</span> | Colour: <span className="font-medium">BLUE</span>
            </p>
            <p className="text-gray-600 text-sm">
              This is a review of the product. This review will have a character limit. The date I propose This review will have a character limit.
            </p>
          </div>
        ))}

        <div className="relative flex items-center w-full mb-3">
          <div className="flex-grow h-[1px] bg-gray-300"></div>
          <Button
            variant="link"
            className="mx-2 text-gray-600 font-bold text-md bg-[#fdfcff] px-3 cursor-pointer"
          >
            See more Reviews
          </Button>
          <div className="flex-grow h-[1px] bg-gray-300"></div>
        </div>

      </div>

      {/* Uncomment for service modal  */}
      {/* <ShowService/> */}
      {/* <ShowServiceSuccess /> */}

      {/* Uncomment for service modal  */}
      {/* <HideService /> */}
      {/* <HideServiceSuccess /> */}
    </div>
  );
}