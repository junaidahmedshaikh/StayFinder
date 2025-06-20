"use client";

import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { CreditCard, Shield, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";

const BookingPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "",
  });

  // Get booking details from URL params
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = Number.parseInt(searchParams.get("guests")) || 1;

  // Mock property data
  const property = {
    id: 1,
    title: "Modern Beachfront Villa",
    location: "Malibu, California",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop",
    host: "Sarah Johnson",
  };

  // Calculate dates and pricing
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.ceil(
    (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
  );
  const subtotal = property.price * nights;
  const cleaningFee = 75;
  const serviceFee = Math.round(subtotal * 0.12);
  const taxes = Math.round(subtotal * 0.08);
  const total = subtotal + cleaningFee + serviceFee + taxes;

  const handleInputChange = (field, value) => {
    setBookingData({ ...bookingData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would process the payment and create the booking
    alert("Booking confirmed! (This is a demo)");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Confirm and pay</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="space-y-8">
            {/* Trip Details */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Your trip</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Dates</div>
                    <div className="text-gray-600">
                      {checkInDate.toLocaleDateString()} -{" "}
                      {checkOutDate.toLocaleDateString()}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Guests</div>
                    <div className="text-gray-600">
                      {guests} guest{guests > 1 ? "s" : ""}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </Card>

            {/* Guest Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Guest information</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First name *
                    </label>
                    <Input
                      value={bookingData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last name *
                    </label>
                    <Input
                      value={bookingData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone number *
                  </label>
                  <Input
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special requests (optional)
                  </label>
                  <textarea
                    value={bookingData.specialRequests}
                    onChange={(e) =>
                      handleInputChange("specialRequests", e.target.value)
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rausch focus:border-transparent"
                    placeholder="Any special requests or notes for the host..."
                  />
                </div>
              </form>
            </Card>

            {/* Payment Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Payment information
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment method
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={bookingData.paymentMethod === "card"}
                        onChange={(e) =>
                          handleInputChange("paymentMethod", e.target.value)
                        }
                        className="mr-2 text-rausch focus:ring-rausch"
                      />
                      <CreditCard className="w-4 h-4 mr-2" />
                      Credit or debit card
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={bookingData.paymentMethod === "paypal"}
                        onChange={(e) =>
                          handleInputChange("paymentMethod", e.target.value)
                        }
                        className="mr-2 text-rausch focus:ring-rausch"
                      />
                      PayPal
                    </label>
                  </div>
                </div>

                {bookingData.paymentMethod === "card" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card number *
                      </label>
                      <Input
                        value={bookingData.cardNumber}
                        onChange={(e) =>
                          handleInputChange("cardNumber", e.target.value)
                        }
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry date *
                        </label>
                        <Input
                          value={bookingData.expiryDate}
                          onChange={(e) =>
                            handleInputChange("expiryDate", e.target.value)
                          }
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <Input
                          value={bookingData.cvv}
                          onChange={(e) =>
                            handleInputChange("cvv", e.target.value)
                          }
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Billing address *
                      </label>
                      <Input
                        value={bookingData.billingAddress}
                        onChange={(e) =>
                          handleInputChange("billingAddress", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <Input
                          value={bookingData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP code *
                        </label>
                        <Input
                          value={bookingData.zipCode}
                          onChange={(e) =>
                            handleInputChange("zipCode", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country *
                        </label>
                        <select
                          value={bookingData.country}
                          onChange={(e) =>
                            handleInputChange("country", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rausch focus:border-transparent"
                          required
                        >
                          <option value="">Select country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </form>
            </Card>

            {/* Cancellation Policy */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Cancellation policy
              </h2>
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  <strong>
                    Free cancellation until 48 hours before check-in.
                  </strong>
                </p>
                <p>
                  Cancel before check-in on {checkInDate.toLocaleDateString()}{" "}
                  for a partial refund.
                </p>
                <p>
                  After that, cancel before check-in and get a 50% refund, minus
                  service fees.
                </p>
              </div>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Card className="p-6">
              {/* Property Info */}
              <div className="flex gap-4 mb-6 pb-6 border-b border-gray-200">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{property.title}</h3>
                  <p className="text-gray-600 text-sm">{property.location}</p>
                  <p className="text-gray-600 text-sm">
                    Hosted by {property.host}
                  </p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <h3 className="text-lg font-semibold">Price details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>
                      ${property.price} x {nights} night{nights > 1 ? "s" : ""}
                    </span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>${cleaningFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>${serviceFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>${taxes}</span>
                  </div>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-3 border-t border-gray-200">
                  <span>Total (USD)</span>
                  <span>${total}</span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg mb-6">
                <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Your payment is secure</p>
                  <p className="text-gray-600">
                    We use SSL encryption to protect your payment information.
                  </p>
                </div>
              </div>

              {/* Confirm Button */}
              <Button onClick={handleSubmit} className="w-full" size="lg">
                Confirm and pay ${total}
              </Button>

              <p className="text-xs text-gray-600 text-center mt-4">
                By selecting the button above, I agree to the Host's House
                Rules, Ground rules for guests, Stayfinder's Rebooking and
                Refund Policy, and that Stayfinder can charge my payment method
                if I'm responsible for damage.
              </p>
            </Card>
          </div>
        </div>
      </div>

    </div>
  );
};

export default BookingPage;
