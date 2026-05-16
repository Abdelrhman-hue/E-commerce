"use client";
import Link from "next/link";
import Card from "react-bootstrap/Card";

export default function LiftingHome() {
  return (
    <div className="flex gap-30">
      <Card style={{ width: "520px", height: "150px", padding: "1rem", background: "#E1F5EE", borderRadius: "0.5rem" }}>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted  text-green-500">Flash deals</Card.Subtitle>
          <Card.Text className="text-green-500">
            <span className="text-black">Electronics up to 50% off</span> 
            <br />
            Limited time — ends in 02:14:38
          </Card.Text>
          <Link href="/shop" className="text-blue-500 hover:bg-black hover:text-white transition-colors pr-4 pl-4 pt-3 pb-3  mt-2 rounded ">Browse products</Link>
        </Card.Body>
      </Card>

      <Card style={{ width: "520px", height: "150px", padding: "1rem", background: "#E6F1FB", borderRadius: "0.5rem" }}>
        <Card.Body style={{}}>
          <Card.Subtitle className="mb-2 text-muted text-[#185FA5]">
            Free shipping
          </Card.Subtitle>
          <Card.Text className="text-[#185FA5]">
            <span className="text-black" >Orders over $50 ship free</span> 
            <br />
            Use code FREESHIP at checkout
          </Card.Text>
          <Link href="/shop" className="text-blue-500 hover:bg-black hover:text-white transition-colors pr-4 pl-4 pt-3 pb-3 mt-5 rounded ">Shop Now</Link>
        </Card.Body>
      </Card>
    </div>
  );
}
