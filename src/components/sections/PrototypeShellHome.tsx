import Header from "@/components/layout/Header";
import ValueProposition from "@/components/sections/ValueProposition";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import HowItWorks from "@/components/sections/HowItWorks";
import MatildaVoiceDemo from "@/components/sections/MatildaVoiceDemo";
import EarlyAdopters from "@/components/sections/EarlyAdopters";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  MessageCircle,
  Mic,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Volume2,
  Linkedin,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const PrototypeHero = () => {
  const { language } = useTranslation();
  const spanish = language === "es";

  const widgets = [
    {
      icon: PhoneCall,
      title: spanish ? "Llamadas" : "Calls",
      value: spanish ? "Atención 24/7" : "24/7 coverage",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: spanish ? "Respuestas al instante" : "Instant replies",
    },
    {
      icon: CalendarDays,
      title: spanish ? "Agenda" : "Calendar",
      value: spanish ? "Citas organizadas" : "Appointments organized",
    },
  ];

  return (
    <section id="hero" className="prototype-hero">
      <div className="aero-ambient aero-ambient-left" aria-hidden="true" />
      <div className="aero-ambient aero-ambient-right" aria-hidden="true" />
      <div className="aero-horizon" aria-hidden="true" />

      <div className="aero-orbit aero-orbit-large" aria-hidden="true" />
      <div className="aero-orbit aero-orbit-small" aria-hidden="true" />

      <div
        className="aero-hero-panel hero-matilda-card"
        aria-label={spanish ? "Hablar con Matilda" : "Talk to Matilda"}
      >
        <div className="aero-panel-topline hero-matilda-topline">
          <span />
          <span />
          <span />
          <strong>{spanish ? "DEMO DE VOZ EN VIVO" : "LIVE VOICE DEMO"}</strong>
        </div>

        <div className="hero-matilda-body">
          <div className="hero-matilda-header">
            <div className="hero-matilda-avatar">M</div>
            <div className="hero-matilda-meta">
              <div className="hero-matilda-name-row">
                <h3>Matilda</h3>
                <span className="hero-matilda-online">
                  <i />
                  {spanish ? "En línea" : "Online"}
                </span>
              </div>
              <p>
                {spanish
                  ? "Recepcionista de voz con IA de QubeSight"
                  : "QubeSight AI voice receptionist"}
              </p>
            </div>
          </div>

          <div className="hero-matilda-console">
            <div className="hero-matilda-console-top">
              <Volume2 className="h-4 w-4" />
              <span>{spanish ? "Matilda está lista para escucharte" : "Matilda is ready to listen"}</span>
            </div>

            <div className="hero-matilda-wave" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="hero-matilda-bubble">
              {spanish
                ? "Podés hablar conmigo como si llamaras a una recepción real. Preguntame por servicios, horarios o una demostración."
                : "Talk to me like you would with a real receptionist. Ask about services, hours, or a demo."}
            </div>

            <a href="#demo" className="hero-matilda-talk">
              <span className="hero-matilda-mic">
                <Mic className="h-5 w-5" />
              </span>
              <span>
                <strong>{spanish ? "Hablar con Matilda" : "Talk to Matilda"}</strong>
                <small>{spanish ? "Demo de voz interactiva" : "Interactive voice demo"}</small>
              </span>
              <ArrowDown className="ml-auto h-4 w-4" />
            </a>
          </div>

          <div className="hero-matilda-footnote">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>
              {spanish ? "Demo segura · hasta 5 turnos de conversación" : "Secure demo · up to 5 conversation turns"}
            </span>
          </div>
        </div>
      </div>

      <div className="prototype-eyebrow">
        <Sparkles className="h-3.5 w-3.5" />
        {spanish ? "RECEPCIÓN CON IA PARA NEGOCIOS" : "AI RECEPTION FOR BUSINESSES"}
      </div>

      <h1>
        {spanish ? "Tus clientes quieren respuestas" : "Your customers want answers"}
        <br />
        {spanish ? "cuando las necesitan." : "when they need them."}
        <br />
        <em>
          {spanish
            ? "QubeSight ayuda a que tu negocio pueda atenderlos."
            : "QubeSight helps your business be there for them."}
        </em>
      </h1>

      <div className="aero-trustline">
        <ShieldCheck className="h-4 w-4" />
        <span>
          {spanish
            ? "Automatización clara, profesional y diseñada para negocios reales."
            : "Clear, professional automation designed for real businesses."}
        </span>
      </div>

      <div
        className="aero-widget-dock"
        aria-label={spanish ? "Capacidades de QubeSight" : "QubeSight capabilities"}
      >
        {widgets.map(({ icon: Icon, title, value }) => (
          <div className="aero-widget" key={title}>
            <div className="aero-widget-icon">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <strong>{title}</strong>
              <span>{value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="prototype-hero-bottom">
        <p>
          {spanish
            ? "QubeSight es una recepción con inteligencia artificial para atender llamadas y consultas digitales, responder preguntas frecuentes y gestionar oportunidades cuando tu equipo está ocupado."
            : "QubeSight is an AI reception service for calls and digital inquiries, answering common questions and managing opportunities while your team is busy."}
        </p>
        <div>
          <a href="#early-adopters" className="prototype-button">
            {spanish ? "Solicitar una demostración" : "Request a demo"}{" "}
            <ArrowDown className="h-4 w-4" />
          </a>
          <a href="#demo" className="prototype-text-link">
            {spanish ? "Ver demo" : "See demo"} <ArrowUpRight className="inline h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};


const WhoWeAre = () => {
  const { language } = useTranslation();
  const spanish = language === "es";

  const founders = [
    {
      name: "Ernesto Libby Lugo",
      role: spanish ? "Fundador" : "Founder",
      description: spanish
        ? "Lidera la visión de QubeSight, el desarrollo de producto y la estrategia tecnológica."
        : "Leads QubeSight's vision, product development, and technology strategy.",
      image: "data:image/jpeg;base64,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",
      linkedin: "https://www.linkedin.com/in/ernestolibby25/",
    },
    {
      name: "Juan Carlos Barboza González",
      role: spanish ? "Co-Fundador" : "Co-Founder",
      description: spanish
        ? "Impulsa la estrategia de negocio, el desarrollo comercial y el crecimiento de QubeSight."
        : "Drives QubeSight's business strategy, commercial development, and growth.",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgwKCA0MCwwPDg0QFCIWFBISFCkdHxgiMSszMjArLy42PE1CNjlJOi4vQ1xESVBSV1dXNEFfZl5UZU1VV1P/2wBDAQ4PDxQSFCcWFidTNy83U1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1P/wgARCAH4AaQDASIAAhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAAEDAgQFBv/EABgBAQEBAQEAAAAAAAAAAAAAAAABAwIE/9oADAMBAAIQAxAAAAH9IEyy1yBQABQAAAAAAAAAAAASiLABKIsAFlPSAADLLXMAAoABSKJQAAAAAAAiiAAASiAAiwWU9IAAMs9MwCgAUAAAAAAAAAAAEoiwAASiAAWU9AAAMs9MygAFAAAAAAFABKJQiiAAASiAAiwAWU9AAAM89MwACgAAAAUAAAAAJZRLAAABKIACLBZT0AAAzz0zAFlAAAAAKAAAAAACAAAAAgAEsFlPQAADPPTMAWUAAAAWCgAAAAAAAgAAAIABKJZT0AAAzz0zAAKAAAACpQAAAAAACAAAAiygAgD0AAAzz0zAAKAAAACpQAZmjy8y+xhvQIAQAAABSAAALG4AAM8+8ygAqUAAAAqUSeOXrHu5688ayMuryen1fL20z9w65SygAAEsAAAFljcAAGWemYsoAsFAAABUp4ec+8te++ep11JzZce8peZzU+r35PXtjBQABAAAAAssbgAAyz0zAKlAFgoAAHHeR4byx22657l5llTLbIx56xT2/S+D6tOPqJe+BAAAAAAiKlPQAADLPTIoAKgqUACqljP5Xo+Dzp9fbyebi/Sx/Oyv0nHzOpd+PlOufsafN9ktw65nX3/f5PXrihYAAQAABCynoAABllrkAVBUoABUoBh+c/V/A51xz9e3F+Tx9TavPvrzzfk8fT7s+f6N/OvGWux9nVNsABCwAAABIt56PQAADLLXIAAAWUAAqUeP2Rfjc74Za7ZZZL658rOz38Y6Hvw8m0uv1Pn/AHu8w74QAAAACAIdc09IAAMsdchYKlAAAKlAFg83yP0HwuNPn99TnrrDS1nj6+a8/pw0k+t9f5X1O+LDrkAQqAAAAIWU9IAAMctcgAABYKgqCyDpz5J17fncZ5b/ADdsNbzcvbynj63ys83edX3/AG/j7Z6/XfM9OuPqc3vPpCVLQBKABCynpAABjjtiALBSFQCFmWGevr58LjT0eTTLPaubz14/F9Tx6Zc4+frXHWZ82aezD6merrlltd8di7Yy8+3vwzTL6N8O3efoRpnQgADrmnqAABjjtgVBQAI5Xnz8zy+u83jjSpVvHfJONOJZzr4eufP4/T9DXH4u2nurH2/N9eevonXXHXPalWIlg64pr7fm+3fza2NsKgoFlPUAADDHbEAAEL59/HnrOa83r5vNXmwvRUioyy9KvB1687fJ6+O0vV65sq2AWWIlizh0nW+F74+hY9XioAHXNPWAADDDfAAAA58no82Hpc1jvOOuVXirqlQBLBz1ysbcWTrmxUpLBQSODnXjsOV5+j3jr6/FReVgt56PWAADDz74ABBUGOGmfl9aHGqWS5d8929JZLCrAc9Zr3YF56QQXxd65+pGWnPHXJpOqTnrm8+r0+P1+ryWx1nUo656PWAADz4b+cAELHK+aJ4/aSzrmu6ylyl2vNOkFQM+8zuwt6z7Qgyau+EnPPVc6S9ILC89e/530fR5ljTGgt56PYAADz+f0ecIAGOvm40kPL65O7Wfj9jrnPHS9c3rLvLbtzSoGWg4515q9c2SpDpFTm5HeueihIFj6Hz/AG7+fVLtgsReuej2AAA8/n384AgMdvPxpleXl9efk+rnrnj68PN1n7MONJfPrheNfRcrz3ozHcg6iFcjpnE1ZytMec7Pdthl3n6rlcdtGazr2eP17Ya3m7YWwXrnpPaAADzef0ecQCB5fT87jT0T5u2Ho4w9fp04x34jnvDVLx5Pd4Z111495pvOEu1465tSCTmxw46nXOXF529/O1448CXn2XHjnv1a+DM+pv8AA+71z6bLthbzS9c9HuCAAebzenzCAiF+b9DFfjb+bTLXXz92XHbrmz235m8vu8XOcuPox7d7XPvnvTvLXmxKc8XiyZXLvlv5fp3j0d5aSd8InHV4LnnxU9uX09M7ZeubYL1z0e8IAB5vL6fKWICDLTM+Hebnr31zzL6mHcvXowsGnJzN4vmz93B5W48/W3Z5efbwePv3d2eL0acy9aZk0mXBtxxK6mXCd/W+b9TTi2Xrm2C98dnvCAAeXy+ryBAiDLTM+LNec9Ll2nXPVDviGvWFPUxS+hnTvnmJsyL6OMKejry6R3wEshesodcaSubxlZ6/q+X06Z9JbLYOuuOz6AQADyeT1eMqBELzYfN8/v8Amcd6snPevPHJ3OObN2A9U8vR7cvPI9V8lr0Ty01mMs3uA378UPoXwaR65iXS+XmvZ14/uJ6NJeuLZatg6647PohAAPF4/Z4iyCyJbJB8r6nB8TP1ydeVthCZrNWVNJzF6ckvXHSy2y5tBk2hm36Xzd+z0c9fN0+j6rPhcfpHefzPrwdXmp0lLebV747PpBAAPD4QgJCVAgJAw8pj6MuRc+S8hZaS9UVSVRbSOqL32S9+s0x7ppjaFoWgoOyvphAP/8QAKhAAAQMDAwQDAQADAQEAAAAAAQACEQMSIBAhMRMwMkAEQVAiFDNCIzT/2gAIAQEAAQUC0f8AnjnF/wCeOcX/AJ45xf8AnjnF/wCeOcX/AJ45xd+eOcXfnjnF3545xd+eOcXfnjnF3545xd+eOcXfnjnF3545xd+eOcXfnjnF3ql7QjVK6pQqhAz6w5xd6ZMBzycZTavqjnF3pOdaCZOkKMKL4PpjnF3pVDNTEo6sdc30hzi70hxkUdKB29Ic4v8ARqf6+wdKB/8AT0hzi/0av+tDIo6Nfa8/MAeDI9Ac4v8AQe4MZ/k9Ro44RqNXWauqE6sAj8kBf5YQqlymU5PEs+GZoegOcX+h87/56YhjD/FVwCcQgYVL+lVY5iJRlpve1NdKrcMMt+KIoegOcX+hXZfRf4/H/wBT6Ul7A5dKTRpdNV2yj8eFMJu6iEUBCpiKfoDnF/o16dlSmIEAo0ZQa2mAqiuhWsctmouR4piX+iOcX+j8nw+vtuwLpf1WkuqBddpVOoWkulFDdUKJafRHOL/RIkVKfT0c9ASLIO5TWwn7hrlKo71fSHOL/S+QJY5PTaspzmqWrrBOfKZvp8Rsu9Ic4v8ATqtscd02k2OkxW0wpbpwgviVB6Y5xf6fykeQiwlGlUXTcohFBfH2Tagd6Q5xf6L6wauo8p4/kphVy6ivTnasEA8Ne4JtVc98c4v70ouARfK/6+1VZKDt7kXK5FSqLNW7HRryuo1Ag9wc4v7nUCc6T9oL7drVpXKXMV6uRVKkX6lfX1hcUKnaHONTtF4CJnQr70+zwFChVXMUELdNpuVKsZ1HAxGgfb2RzjU7JMDU8feXyKkCgy5xbBqM/wDXcqrTKo1bhzoMhwgqZluY5xqdmoe2WynUgWhgCBlzp/yjoO5SO+Y5xqdk5DjIhObKZuRz2xoDBzHONTsHjXnQocdiDA7bcG7tyHONTsP8cOUN0zx7DHWr77BROw4UzpT8MhzjU7FTL/tvHpFf9SonWjxkOcavYf5Yu8h2PvQYVSWqnVBboUPLCl5ZDnGr2CucXcDsfegwewPTKYYNW8YM2dkOcaubuNN9Crf5DpQ8swoK3Q4z+u4Ocaubzle5hH9A/wCwZwV/S/tDjNuY4xHONXN/loBJc2F9uZIabE+CAdux95uOzeMm+OI8saub1xo8uausZpVpVwKdwuHZhfebt0HgFzhbizxxHljVzqc9RSUyIG6NBhTqL2n+mo7h8kNM6zgMJUqVKJXLmiA7dWhWhQv6CuBTOMR5Y1c3tlyKfeEKrgW/ICvDtIhRCGxuU4jKUXIS402wHlMqf11V1mLrU0CCiJVLJvljVzrfIax/Ve5NhGERT6fTpo0GoBzVMoqpy07/AH2SidKbbQVWvVMIqV0yUaaFapSNF4e3FvljVz+TRadGlO5gqagTKxUgIGSSjuW7JvaKKotk6kBWNWwVyc5PHUZ8Wh0Ri3yxq51PH7lHhAIsBVsIN2LVBCIKDoTXDQafehUqVumbNGMJxcrahVGnDsm+WNbN/geddoCdgRuQrAUWQrdv6j+l/agqxdMrpFCnBQGBOlyvRcm+OLfLGtm/xPI1lA6SvqdtAEQoUIiEOCFGuy2V0K5F6uJUFWFcK16pM/rJvljWzfw/yCOsqU1XJpUqd7kVOh3XKlA7zrGtyuReVcrl1FQl1TJvljWzdxUG4GH3qNCU0KdvoInYFBymDcg5Fyna5TrcpkRcjTcDQ/15N8sa/YrIHCUTpKCuTSr4EqUCi5XKVcrlcrlcg5XKVKkKSr4TQ6o5jbW5N8sa/YqNnSVKlTpKlSpUqVci5XKcZV6vV6DlcFeEXzpCoMsZm3yx+R2DuqzLTOkqVOk9mVOcKwoUXlGm9ulClcew3yx+R2SAQ+i8EfHcU+jai06TnuoKtVqtVqtVqsViDUEE3YKB2m+WPye5U0tCLAumrFYrVAUd0Idxvlr/AP/EACQRAAEDAwQDAAMAAAAAAAAAAAEAAhEDIDAQEjFAEyFBMlFw/9oACAEDAQE/Af7JHZAlAaQiOuO2LYnqtHrTcpU6BHnqMPzSNI0HVBgqdJU6E9ZlgTueqGk8JtKObSyUaZHSbTJXhTWgcaPb9ClSmN+nUtBXhCNMjMxgFp9LbuTKfv2h+rqrfuSkPd8ICL3iRkpcYJM3lHnHTHrH5Bu22FP5xBDQkDDtEzbV5xUxJQW4BGCmujLVxU/y0cQTq04JUy7Wrxip8reETqCpulEoH2t5W9OdIxi1ptJU2nGL5U4HYx0DjbZKlSpUqVKlSpUonLN+0raVtK2FCmnNA6DOFAW0LaFF9TD/AP/EACMRAAECBgIDAQEAAAAAAAAAAAEAEQIDEBIgMDFAEyFBUXD/2gAIAQIBAT8B/sj9klk9QeuT2ziD1TS1MmRoOOpFR6P1yjRqgdaLGHqkgKKZiI2QmDpGYAvKjETSGL9TUjPyoiIXlKEwHdFGTiPae1GJH9GUs/Nkw+s3RzhLHZN50fNA41x86/FFbeMYONZoA+m+JrcZeqYfVLSUHCI2y9UzigcCpGgBfKy+dUfCsQwbJqN6VoVgUIY6ziRiAjiNZ1PlDrPQGs4smTJkyZMmTJk3UdOnVyvQL9CLlOrin0Qaf//EACwQAAECBQIFBQACAwAAAAAAAAEAIRARIDAxAkASMkFQUSJhcYGRI0JSkKH/2gAIAQEABj8C/wBzrBdE6bt7rxV6v3ts09jhP12z4tA91I7Vqt/PajbBUpMpjs51HoiGjlZpxGfVfHZ/tT6wmSv7QZPDoneDQHv2fUIfadeoJk6kvNWke3aDLEeamcgUwiAe0gy60CeExhJSMWXFrz2mRwsznHiKZSU4Shp+e1z8RksrKwmBjxeO2EQxDAp4e2CjCcUT99yNiyfV+XOZONsNhIUTGVLBoeHEfqMou8G2Q2swpFYKwnU9WLWU+wFr3T25cybEOKXwuHX+7sbXh05QEJBMy8qWrPndDaZIUpJmKfPVaJb0bf3UznSp7wXihZYT2ArFQuNAobdr47K8TWKheB2EwM5KHEXoNwVDf+9kVioXZzuY/wC7YVCuVXDqwmQsMbYuioW2hIqXUKe6FQqFllMJ4sn2Ul1lWKhULHn4XKvVCbg+y9GufynhPY+YSh1/VzFdCvBrFQrfHiPpIknobEDfaJMp+FyldQuZMU6IqFQr4clf4p1hCWlcmleknSs8UTsWBlAQ5Vg/Slrce6mKhUK+P+1DEhZmpakxoN2dnh/EZlzUKheyV1hna4WJL1VioVm/lZWVlcyyVmD2xUKhtjD5qeLQxDMOVfyfVYqG4EZWWTzj8VioWBvcJlzWBUOwPWylWKhv8LFDR97Aq02Z7nCwn0mE9WLIq02XTCadt1gWhVpuDsYo/8QAKRAAAgEDAwMEAwEBAQAAAAAAAAERITFBECBRMGFxQIGRoVCxwdHh8f/aAAgBAQABPyHTD8fZ87sPx9jzuw/H2PO7D8fY87sPx9jdh+Psed2P4+x53Y/j7G7H8fY3Y/j7G7H8fY3Y/j7G7H8fY3Y/j7G7H8fY3Y/j7G7H8fY3Y+lzsvhGALzUjum9h6yPAhKp9NY3Y+jVMx2FwJVIGkJCZOlPBi9LWN2PokTvZcjpLv1pGhiNWYZ+kWN2PovDfvotw2PtdHc2/o7G7H0Mwp4G9zqJi0kbeBtjDCZPxHPo7G7D0LQztohMjTwMa0SRx4R6Oxuw9H7hLR6N6EGyb8MXm/sKWyU6r0Njdh6C2whO1+2B5QTSSzgxzUT5Js6Bzg7aRbpIXBA8aAPUnl6Gxuw9BKUBuIJkYoFO/qhwWpEdOjPYqNH/AEE2kkIrCsKqQ7SdxIye7T9DY3Yeg5JiUSbpYFck+RX3mLEK2NrMwJFJJeETpqbIMsjqlSJMFTsiqRSwk3LaLufB2MT0Njdh6FiSTdHKKGQCXMo7IphR35KnooS1QvXeDVhXgkKgq3m/RWPO7D0K5iLhC6KCBLkIQTCBwQKsjtb6L1pJARskkt2KCOKWPRWPO7D0KnolrinSTJywN0IUT+WyG0xbJdEIo84Y+66FIT0ZWPO7H0XlUakDxe2RDVQQKmGv6GEXND2GnPYTJlrJ6Ox53Y+iaTTTsxrTAqoYi0ynkhwf6hjiolHZDaajAoZlRWd9H39HY87sevJJOjqbbQxxKBJQQefuJOAmLykaTTuHLVnwySfQWPPp6mLL5dhVNDignihsO6J6cciihhyKRMuSXi7sRaK6hQoku9T/AEkJpJTldex59HNiR2aZcXXgtx1yx1dsbo7jsQMIXUojaK/RUySwvkaascnYc/rCJoeAdix4o+wtSQ8nwXQn1LPn0M3Cl2HgljFTRcGQ6LTmUQ+BjQtbDJ37RI7hLDDZYcJUYrkawiCwalGKuhUc6KjEqzH/AGicqV0bPn0A4i/AY0sMaxmO4jISRbA9Ca4tu2BufsG+BHlLuINKrZCCCJQg4640aW/OkyibXAnKldCz565WByrOUTpcHoWsQXVCpFd+wp7QWtKqalSoKlEKBQxS5ZAmfKCgrhwoyljlEUEMj1Vyn3DdYGmuD2HoWfPXKkcaPkkY8GFsaHWKcIi6EWgaTMGM/wCoVMBqvgptRsSoJBGiGY0wImEdsu4iCPPQt+euNLb1f0J0jKHb3LG/JBgUSzLFil8iSzEblpjSfgTLu9Il9C356w8O9WUQs59iwfW3Z1bIMyoipIV+hjStLgnSRpHbf97rT/bY1Wbiz9oahmIPp9DLJzlNylZwOrOIkXQahAEhEfo9hyWHlO2+35609lsnmjGvkVPNCQq46DyZ0XQcdYdjsUsld9tGNQ3/AHusNOqeRlhI9sZeeh/QtysJWIYiELvzrcir4RaseGXK3/e6xU5yJry1tb4JkSvtUar6CE6WLYsrMqw4RVrvRsyZOXOxvgf3W/73VGh9GkyU7olMoQ0oWCA0Q7R0LqXFLLSfuPmgajeyai21Ou/73VKi2mpUYY5A7HyQQy8IdxpJ3OWgiOafv/wbTj5OTcxsq+296PG773WK6laUqSalV5Em4C3poxcmp9hQoqME7J1Q6nOydGQMLdyNNX3fW3fc6olSr2lFGIxMxggkjT8CksjlnkdibQiSaeGJkkkkmSdg2SSSSNkHUrsR1EGUZiUKChA10F9zq1iMISOiluyRty92SzaI7iJJbPlSYlCE4oIqs4YtVMsByiMSTokTM6HfSdyKpUoqMrIeVd6C4W/dnA0E8e5Un/yROQ0+B737nVq28wC4SpomOQ2JErDyQKtCSox/KZW+gZJEwKToXDdBMT1O5I2NjesoASSHYVMdEEh8nuITMSyrEJCSiSTKxZ87vsdWY4PhJ90nYRq1eTmSGiCIc5gnj9AvXwDlFgRFizEk8NXTE5F/YVonIbExPRDuPRsbQltwhCV8j0K8ONlIgUDKEGtlkoG/mNUtKeBGx/IJIyt32OrZGkzyJwWENMOD6sqJ0pVvAkqrEqeUcA8xWV86MjuKxgVx3GMbG0eFW0RAxdIkdkJWIGidCgKdc/2GVVgVlu+x1et9Cgp7FBUOORMNCYTcQZY4FSJaL5CXMfBAqmhhuo70KkKwg8jY1BryPiVOwiUkNImVejKRBxN+D/YMQpvLVotv+x1X6g1Rwh1gTjAnVUCqvLEtAldCq2NXfOgTaCA6QyBkTVJy00/wX/5Ia/wQzNncq1AnIVUCUWaJsIhLJ4GcBMXY0WRsczGbY7wt32N39d9woqvqTlOsdimCIbqpJSqlFSxSTyRJEtL2IJ4ETUUY3UFCjsTewRweZJL5OK9hKUWJsqFX34IWKhG4hz8ECnuZLmBsqWqssTM/diaUnypv+xu/vvaAkUanHJUVY6Bh4Iguc2xVmZFSRkNy40iClXgmBQ+R1HepUyyqTGPgutBdRDljjkTTUKHQcUMm65N7/sbv7770EWhN8iSEkOA8CRVWQz0gGO47DJrbyx6z8ESdiKpQpgURliWio+QaToaTERSwOyQT0Ud2VRIhQklDrG/7W7+vQXPGk6isSl30MJ0tLrYaJQkKux2IpRUdJQJmcRRnUTjmO2CoHwE49AlKE6CZqHazuRcpeXv+/u/v0IjzJZj0WakTsEinSvoSMoKiSSdGiuxphSSC5hPIuZDT38GIgUvIhGyqq9D7+7+nQRIMgWGG9inRJIxvWSdWWVII0iRPFExNsKAvuWydxD0K/wB9H7+7+22SdXpJMltHDRe6X5Y56OfYVRLzokkkl6SVYE7cO7QlFrAkLQqBFeanMdL763f0JJJJJJJJJJJK0GMmcDTk8zyI6UCCCCCCNEtEIWmzqffWz//aAAwDAQACAAMAAAAQCX7D/jHPf/8A/wD/AP8A/wD8tPctPe8cIILsf8N/vOMMMMMMMPP/APLTvL3/AAggr/w34wwwz/8A/wDvvPDT3/rTvDDCCC/Df7Dfvf8A/wCMNOPP88tP8vf8sIIIMd8N/wD/AP4wwwww61/7w07w9/wggg16x3//AP8ADDDDDDD/AP6ww/61/wAIIINesP8A/wD7wwwwwwww/wD8MP8AvT/CCCDX/D3/AP8A8sNMMMMMP/sMPX0tcIIINf8ADH//APyw298Cwz/6wwXfaUwggjw9yw//AP8ALHQ7jzKV9hBV99JDCCC/rXvDD/8A2uoX2iq/OATfeYQQwggq9y97w0tv1ExgFWsBffcQQT0wggrw9zi09Cu5fsfua6XOQTffYwwggl/zy8/ytojVD56LpeBXfcQRywgggw096wtioH4TRluYHNeQQTf7wggn7yw8+isrgivsDZXYRTfffc9wggqw9/7yw3xQNKqdEvPg2cWYQ0wggs87xz91tpGS9kHAoBHa9s//AO8IIIc9ONyAUmF+28xoPGfNKOc8NMIILvPPd2iiSmNtRddkRWhMScPO8IILPPPOh3WwkEHzy0jTDK6abO98IIJvP+vNneptkkSD3S4oYIKSduMIIKf8dg6nT8UE0WAioM3MSyiddsIIJM/N1rokwIrLpjueCIjf0UG8MIII+N+XcpErO2mnGpuEmIe3GqbMIIKtuv34x6KLk2qa9iIhs8OrI7IIILNt9xrKl27ql9FdjwB2fj3AbYIIJ8+MFJVms9SIffbWQn0lv3CSIIIIOtf1voqE1qydxgPPkYx41iRAIII2n1GMrbBBHeSrQnwsnh7/AAkYCCChZaO/QPTHUbpjrjQnMdEPbtxCCCBh+ei8eiCd/Bj9DCi9d/DDj9CC/8QAIBEBAQEAAQQDAQEAAAAAAAAAAQARIRAgMDFAQVFhcP/aAAgBAwEBPxD/AGTcie/kgTozPk+OcJ6EyY/FPfQ9WWuPim6bciekuHen3fE90zeLNh6sWSw2efiZDAXSXp1bpMcHxl9SO2SXpBOXxWcEq1SJZvQjIN67mz4K3PBB3luNiSxiRMxkkbiSnpueOfKCuEL/AGCyOixsh88NovxaHUE9Mk2A4eTXf5HZtwwPZbH+zb26B5DyY7iNAnE944jx4GO47DlOHoT0HH4hrkci9pD2HZ9Lz0OjDg+ORLMZn7kePq3w6epm9DxNBkdCIfUWxnTezbZxa06MPbxINsfVEu51yY0W9VlmaSnDp7+yJ88Q5K92MLbD6YRjowFh9djPnyNtttttt2/2VbDtZfXj9Z673b2qy18attt8ICdYnkHOjHNttttgX12AEae2Jtl3zemfyn8r+FiDpnZ9fD//xAAgEQEAAgEFAQEBAQAAAAAAAAABABEhECAwMUFAUWFw/9oACAECAQE/EP8AY7qVgj19IU6Ckvw/Pcw0YMGz5XrQaMIAZ+Vsq3R2gYKjOj5B7FpuXmXMt7FiefKLKgrDDQhKhOfmPsEqFfswR7iEx8vawHBCCk7jESkT3j4uqzF1gmZdC6i0qU4aXELIehME45VotjP82lVExYlYV7CJBdr9uSqn7uFOplhjuj831DyLpwIUfd5HYeN29XgWIWbCKzxLRcV6L0lcHtY0dCPCcVEsCWS71AcytK0vYRNCd3iAykOZCM9pUrZUrQKK6BF04itCK9hazMRiWVGkrUIENCO0un4MU74mCGJZEIBLOpVR0CJMCthDjlVpUqZlSoNS0c7KIMck1rbUTaBBRxm5UqVK4ALrAciSpiVKlSo1KSsrKRp1HcqHN2QUIXlu/wB8P//EACoQAQACAQIFAwQDAQEAAAAAAAEAESExQSBRYXHBEKGxQIGR8DBQ4dHx/9oACAEBAAE/EPTz/wBf7VxeX+v9u4vL/X+3cXl/r/buLy/1/vzi8v8AX+zcXn/r/ZuLz/1/uzi8/wDX+7OLz/1/uzi8/wDX+7OLz/1/uzi8/wDX+6OLz/1/uji8/wDX+4OLz/1/uzi8/wBNUqVK+m9wcXn+kCKI1urLeC6rQzOgYeZg1XPIlmEdJX0vuDi8/wBHh2NA3XkQ9NXa/LFbOCJD/ZQqpk1gJSjRVM02K0AfJ5mEsyO/0nuDi8/0TTLmg1XKW7ummw5EDN7zRpFO0WrrEX1iJqy+eSG3vfbPLsx+j9wcXn+iwY3jOXN+9IPvBmAbzExWYMakOJRLIKrIPKbCIw5O/wBH7g4vP9ChloLftLLOpbuy6dcsqJA0YzYQo3VSh5Rqd4FVOk4Pv/59H7o4vL9DRGtz84hoHSPHKbRMLzZFAs95b/iW1tZdbLmCbaiBbCU9z4+j92cXl+h+Ff5IIlxaOcAcwSsJLml3M3vUIKfwxYaI1tRh1g6ANa1rfzKAC5rh30vpKdzs5n0Pvzi8v0G+uK5uxDMhIXccr31JaTeWZCy4Ayfdh0OCChgw3WBl/YRCLvmk3WNVEmWthqS/4i0C7Zjg20fkH5+h9+cXl+gYJVYv8NSisjgdJeJpdl6MSrFK1bmLtLkgSBcLLzcbFRdBhwix0YzjJYzDRs0NkGCcPsjERik03iVheScomtZCDWKUv5r4I/Qe/OLy/QYAv8kZ/wCyxNKyd4HfqL+0S/AUDaJAVVRbvE/aIK0R7cwitAgANglie7QZPtFQFdDmPzK7SuzlhpS3WjSEq0aSumzY5Ajt6ie9X9D784vP9BdMsYuHM8uzZBpWg3nrtGiWutXBtByBGHeNthAY3lVN6NZqinVNoALVojMLoCtkRuKDnBcc5bZXGtyX9D7dxefiv+PEwqncCeWpg9LXaahglqzTtCFF4umX7ippuotUYhbtqneGgQdFgW2OkxNacpZEQDm7SiQBTr61ec2+h9u4vP8AQjuDQdyWi6SpdKxe8pvZTiGxeCM4zrNiPsS5uI2QFpqXjIORMIVqsyMPeqUzWOeUp9bF+2fo/buLy/RKJLbHs4fERQczH5/4SjhQxaEBhDyMxUWqbRTqtYsRfxGDXZKUCMj1RcrIgzRHd/y/o/buLy8N/wAoN2FJzJliFh5mz+PMEaB5xUDdMpkuByXE6pNbPiMoXkplIB0VGAGsdjrtNFlK5iOf4ly5cuXL/l9u4vL4/kuXL4BcWhZEhnVx+PMUqtHMhtC86QNrvQlqMm4JlfyIkpvTKQXuxvHg32icxR+YNRPcM9vUuXLl/wAnt3F5vH8Ny5cuXLly5achXkN0BmnSu+rAYqMxho2mGd0MZUybY6zMbxydYF1o2zvG9sji6IQz9ohtWL6y0qnAKP5ySxoj7p+JWEm43Lly5cv0v+D27i83j+K5cuACqAbs9nxj1H0MsEpRgptEaIDBELNQrHbJsR70QMs3xcditN8MyrRI+xcIM/rKuwducRrqzJsc4rbjV9o73zuiZUGm08xVLxAObn8w3E93Pwqbzv63/B7Vxebx/DcuAiANVhWj1dCYsA4HzN+3XZjwGLmDE9KWiNcdADvMTXWh4ssNRyzLH85InNbEcoOUP1UADAEOSXrWt2zmAR1u5hm0w4unoxOFxyjVANKuNoLOQz9yACCOiby5cvi9q4vJ4479WRatm3dmfh2DQilFuoRhlGuVklgTfanxLo7IhpLnau8vQVFlqTpKe3ux2fVYGHrW8pV6QVTyZe6iAzjrBKpl25S6sxVeiTWkNZceSINRqEWo0/8AYAJhLP4PauLyeP4Qfl07y99gYXMfjlLvEKhuFn2zHm8yOo9Jum7No2WGTbn0hQOQ6RXuHSNv/Y7Da1QtoLx1jZo+aA4pPtBSiBaMHNhC1JkLxtRCUoXppUwpjSU9RrRikVaijZ2hDWgVaUu+cY4ml3h7in3ltLnVeRPYASkHXF8fwe1cXm8cd+lhLot7xhRpMKdn2g95nfnhhlOZDSBKlkARI2rV/fWUIJWhmdN6b0YjFC6lac7Yt7/1i79pQB0Hkc5UCsSo0V2xCAxMWDM1jaMajvMh1dpnBbyrpMCiWL0HufwexcXm8cV+rubtxY5mCjqjKXIZr9P38zLsTaEqbehhgXTLeERRneN6QjNIsdt1cyiPvP2JRTtAoqVNoaxmj0dUNoXFchYwPMGazpe3/B7Fxebx/B0KIsZYyFxbJFq5Mu20f4x/fxHacZqVKxUZqm1coEY7Q2uanrt6aw9FpQaL5QXnRn7zJxpAuIWidURx+wcXk8S5fpfpfpVTmPS5rpHyq5OcsQqmqSZi4WdesVt0cLHWXFCBEEyLAjesrSLFo2tmp7+rp6XLlyiMTujKg0DXnAAtai2IrfzTAlQ5k4L9fYvni83iX63Lly5g7zLqPOOtmsoteBHWzA0YwdjKdk/7O8g94cLNosiGVUuPXu+rpBtQTGvSb+ugdYK1oA8viOVdq0Jcuzo0lBgwRZlnIIw4vZPni8vjhv0uXRyxDkykcSl0KYMZ0l6HJs8pynbXWzD7RZPVL4XSGkG32TRc5xWfd9XSYkAaErt98YftFUsp0HVcWosy70Nx0E7sShgweiPODkZlwcJfp7Z88Xl8cVy6y7RKDdc6KdRiJrGnDklLz+6A0YeUtq1QTqQEzTD7S6gy/Qjoy483q/EaBnLGwzUXoMuG7i214vqQMAHSC+gcpeJ+CDZgy5r3QlzG8owJYux4/bPni8vjjsfSpkyR20p2TWbl+aGgwxNzSS3zBcLBwu7v3lM7uy+z/sG2D+3Lly/S5ZZuNXj3l+y2NJBlaN6GJc5ZiXiL6feKxYpYU10O8AAbGIS5ccygpzl3xe2fPF5/HHqPDl8TSyPo1CVaFQNa2Ro/dpRDBqc4hBMm3fEoLCBxLly4se6h1scdoGe0rGyvo/5lwGTB9Lg9vxFilQzQcrfib8Fw1lj8xDh9s+eLz+OJlrPSLV96akpcUvhZLbaH2mCS6uWN942eZ1gIjEdg8yC35IhVhIdUGDFmEHMHDHZrHQcpZYl1FgwiyKWK9pi0yAOx+sZKIOnWHpUT0drBw+0fPF5/HEy0vMx9o5hY1CFNruTMq1LeXSlurEsd1uvOco60yrmdoM2xFpXhgx+IhS7mm8+/CpC3otLwzDNK31iyze/Mst9A6oPRmETzg1KjpgXkbxEkFADUa0IZGCm79pXNUo7zs1KzHfQKhBl+vtHzxeXxxXLqqm6NYVt8jSZartnxcvCLUGB/2LkoujtMC6JHtUCbxDauiYlw04XCXyshXKzI9YqRM+CUqOvKdcPSqyxOUrKKluPOnEvvGmtRpMHWZ7xruysYVIArDp0gDIByr2/5CEK3pxRvB0YG7/2lB+CUp0/2eEOS+Wv/AJCDlodL2d49PVly5cv09o+eLy+OFfQlRUrZ9+cFGENAMSwZQ7sqildhZAwBbNBjswb03L5W9S46FEJSF1Laq+t9P3lGxpF2hX2LYcoddokBeZTqCPdszS22LMWUwlvo1/8AkwK8zDBqJ+OszbPNdVgCKu2IpJiIoK5xpaA9v+xIx6y1NAHu1Dr7Uyg5ZetCFdjz64hBh6+wfPF5fHBcv0KRaFNorWDsbfzHm9mc1+Ya2WhoY1lglSiFeazCLK61GNWLWvYGBpvAP8I5QdEqTvESooXcru2Y7kwTKy4qUVtMUvGkedSLKKLillDtKtJ1IkhatBzYYQurXNlFQXtDeBa2xud4+yTFVC4lD2+0uCK6qzR2icirtwGZ1HXkxDCa4pVPMq7SnG0IQh6ex/PF5/HBcX0TThrDjuICOd33jfYVh1koZb1/bjVZNWDD3ghBhuVNZEupwxyiul0xSrpWNNdekJG5jdiJTApXTeF1gV+xHm4t19Bl9SHfpHzRZZi7fmKiZFlzFGZmMIxVEJRZtmoCrArnM0p6kPCVxbAvQlAXtKE4qszCBUs4rZH4a97B8sIMIPp7P88Xm8el+jLiwWGsZrnNKcmoyaLUV2hYRXBXYwWpLsdomMa2u8CoUddo29y5Fh0yHVzMTcbks6V3tKM65USkHeK7IezG5bmT2nMZhY5znSmCGi+8B0LLEGTgGOlpylrWbUtMxx1gaoKOjmYWq6Z0g4rdK2P/ACC8kO5nxA3qsLXt1m8GDD19v+eLyePRlxYsuZjdZEq5dzD9m479DpK1gaL01jFQVsDNTUm0wkXLBcf5KQEbKL20/wBhGIUUU85kQoGOsMKVdl9HlMKjWLYANNzsDk794GvhzZYqjSkNQNA/abFYOcN0q7EONV+JmZO5rMcV+0zuHTMMAwOkB5DrBhWja5bkFRA5a7xOUreYLqvrF8FeRAFIDyuEl0VtNY0z3qEIQ9Pb/ni/Z9vS4sWLFiMrRSaQr4YXFSKykrrFBqZOaFFMc5a0a5EFbOs671LjEYtesxjItW98wmWYWSIRdGmespqVZfPxBBu0ffXEuKYcHeZRcQQbru5lRS3Bo5MM6gCqNpaKGdmI5ZE1UGihbYFKKrrLHFyFQZDA1WkadDyO0UTR3vbpKmMOiZZDqRpWeyXSSm1YlJK7dEQSi9xxHEKcgtbrN4Qh6+3/ADxfo+3qsWLFjhsLrvAXZBeOsN55F9CLlbN6g4O2hcQd9u8S1/iZVaEzHdAtykOgtsG/+QNO4ME68aC/3rKAl1Q/BOUFCPdIAtjkntGyNAryx5Kxz/EYKvOfmAgaaK7QgZz+xKt7GzeIBy+JWlG/EAjfXMVsDUrn+EBcKguZWVerE6N7kxIDlcvaMXqzGGspMhcgH/sIS4QhPb/nif6dosWLFixY3EHGJbgMlazDl65jqkE51LS1g2gIDU5ToU3VXpGLB65ZdgF1tBIbu7DJnczAGC0a7soqWVpcI3Dn4IN0BF+IVmXVA/McLqy+UACdG6++PmWVyQBMia3mbzplHeFZ1Mlww594DIcnHaWHxKpV9o7Y1zIqKxTrmaUfhLZoG5FlAw0dugEqCRCirecIQhD09r+eL932ly5cWLFi9LuW2RLY/MAc1TM2WpvOrEvNUVTi6xKF7kLN7EAKf+yjcNQaTGQOKuBXMjgqXFi5evaufKb6qwBLVTnAZgULgblAA9MzOdblqc5I3FvMEjeSLa3WIAVwmyaZ/slBV1h1d4uXNKj1mEjllgusqOZkrQJo+LdC1hBhCHp7D88Sr9uUuXFixYsWMAHU9z/rBUHFYiAZgDG20vMYCb3vKI57Wyxi6haNcwS2GpFq23KzDolZBAqN1XrNrF3iEjy/E0YOkDqKH/sl7kOoxeaj1lZH8kF17BcbQnm5Ygynuyw1ZcKBFLhCEIensPzxL9O0uXLlxYsWVBJSK1heXKcyUwhxraa7vEzJQ0uFs6RHOLa25TBvTSKrZDDWH4m8ax6I1YCKzKwLXLpK3ioBvADGsdkuxGWx9onlprYJpKHJZ+SVvU/MWqBsH94hQUQhD0JcuL8H54v0faXFlxYwxcWGgAplAbli/uR4eRn4CBBbkK1CujmUqBI0KqGrNQdVmd/oLjLHlYbCYpmiD3YDlG2xNGC5Z1+YaBbKVSbSpC6p1YFBiAu6zpBNVbliZZc3MNy/QhD0Ien7rnxKv25eoww+kw+gwxdJoKQCtnRm4uuUFrDqSnhR5/bKH+I7iwq0gehDCEUgIGAgECNQwxZmqCgciEIQhCEIQZc/dc+D/9k=",
      linkedin: "https://www.linkedin.com/in/juan-carlos-barboza-gonz%C3%A1lez-%D7%97%D7%95%D7%90%D7%9F-8492511a2/",
    },
  ];

  return (
    <section id="quienes-somos" className="founders-aero-section">
      <div className="container founders-aero-container">
        <div className="founders-aero-heading">
          <span className="founders-aero-eyebrow">
            <Sparkles className="h-3.5 w-3.5" />
            {spanish ? "QUIÉNES SOMOS" : "ABOUT US"}
          </span>
          <h2>{spanish ? "Las personas detrás de QubeSight" : "The people behind QubeSight"}</h2>
          <p>
            {spanish
              ? "Tecnología y negocio trabajando juntos para construir experiencias de atención con IA útiles para empresas reales."
              : "Technology and business working together to build useful AI customer experiences for real companies."}
          </p>
        </div>

        <div className="founders-aero-grid">
          {founders.map((founder) => (
            <article className="founder-aero-card" key={founder.name}>
              <div className="founder-aero-photo-shell">
                <img src={founder.image} alt={founder.name} className="founder-aero-photo" loading="lazy" />
                <span className="founder-aero-photo-shine" aria-hidden="true" />
              </div>

              <div className="founder-aero-body">
                <span className="founder-aero-role">{founder.role}</span>
                <h3>{founder.name}</h3>
                <p>{founder.description}</p>

                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="founder-aero-linkedin"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const PrototypeShellHome = () => {
  useScrollReveal();

  return (
    <div className="prototype-shell">
      <Header />
      <main>
        <PrototypeHero />
        <div className="prototype-content">
          <Problem />
          <ValueProposition />
          <Solution />
          <HowItWorks />
          <WhoWeAre />
          <MatildaVoiceDemo />
          <EarlyAdopters />
          <FAQ />
          <FinalCTA />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PrototypeShellHome;
