'use client';

import React, { memo, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cover } from '@/components/ui/cover';

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sectionEl = sectionRef.current;
      const containerEl = containerRef.current;
      if (!sectionEl || !containerEl) return;

      // Set initial state (white background, black text)
      gsap.set([sectionEl, containerEl], { backgroundColor: "#ffffff" });
      gsap.set([sectionEl, containerEl], { color: "#000000" });

      const toDark = () => {
        gsap.to([sectionEl, containerEl], {
          backgroundColor: "#000000",
          duration: 1.2,
          ease: "power2.out",
        });
        gsap.to([sectionEl, containerEl], {
          color: "#ffffff",
          duration: 1.2,
          ease: "power2.out",
        });
      };

      const toLight = () => {
        gsap.to([sectionEl, containerEl], {
          backgroundColor: "#ffffff",
          duration: 1.2,
          ease: "power2.out",
        });
        gsap.to([sectionEl, containerEl], {
          color: "#000000",
          duration: 1.2,
          ease: "power2.out",
        });
      };

      ScrollTrigger.create({
        trigger: sectionEl,
        start: "top top",
        onEnter: toDark,
        onLeaveBack: toLight,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full pl-10  bg-white text-black">
      <div ref={containerRef} className="container mx-auto px-6 tracking-wide py-20">
        <h2 className="text-8xl md:mr-20   ">Turning passion into code, and code into <Cover>skillset</Cover>.</h2>
        {/* Adding Cards Here */}

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa minus inventore quod, similique sit beatae maxime, in rerum, reiciendis totam placeat? Natus minima dignissimos illo aut aliquam inventore dicta iusto impedit, rerum cum at iste odio facere molestias quis. Facere eveniet dolores quae minus molestiae distinctio? Fuga, ut magnam natus, voluptatum est perferendis at doloremque delectus blanditiis quia corrupti dignissimos pariatur facilis ducimus amet excepturi ex numquam sed libero itaque inventore velit ipsa! Soluta aliquid incidunt, illum expedita error corporis nesciunt. Quidem cumque qui quo fuga ullam quibusdam iste ad aliquid dolorem repudiandae magni molestias dicta laboriosam maiores laudantium repellat dolores dignissimos, vel earum quis libero voluptate sequi! Corrupti laboriosam minima incidunt. Veritatis impedit enim nesciunt! Ducimus voluptas autem reiciendis eos. Illum vitae quam commodi assumenda velit quidem inventore ipsa tenetur excepturi? Eius nostrum minima saepe voluptatum harum fugiat asperiores aspernatur sint quo iste. Nam facilis voluptas saepe, totam sint quod quaerat rem perferendis cupiditate enim rerum quidem quo veritatis minus explicabo quis quasi magnam vitae blanditiis debitis quibusdam modi aut ab cum. Asperiores neque ut similique odit nobis soluta labore, quam blanditiis nam voluptas dolorem est reiciendis iusto atque exercitationem eum modi, minus, laborum aliquam porro eveniet. Quasi, nihil delectus architecto dignissimos minima neque ratione voluptatum incidunt, harum magnam minus repellat rerum dolore eos vero odit amet porro ea nam ipsam libero! Sit eaque reiciendis, similique at dicta dolorum ipsam natus rerum dignissimos labore iure veritatis fugiat deserunt blanditiis numquam, delectus praesentium ullam architecto hic, molestiae quia voluptas! Nam similique suscipit unde, cum officia quo rerum. Corporis, molestiae reiciendis rerum, blanditiis obcaecati dolores quos ipsam, doloribus facilis velit iusto eveniet. Nisi nemo recusandae dolorem molestias eos ex excepturi nostrum, fuga autem inventore sit impedit tenetur error, voluptas obcaecati temporibus rem asperiores voluptatibus perferendis animi ea? Autem ratione similique deleniti nisi saepe voluptates magnam, ex rerum voluptatem delectus quibusdam iure atque sequi porro corrupti debitis mollitia. Iure iste, adipisci esse provident ex, odio minus, quia quaerat saepe nisi laudantium nam natus pariatur illo eligendi reiciendis. Eius consequuntur veritatis, soluta ipsa inventore sed ipsum reiciendis culpa delectus iste in neque commodi ex libero perspiciatis, quas rerum totam odit, quaerat quibusdam corrupti non. Iure esse cupiditate hic odio soluta laboriosam neque, ea natus optio labore laudantium nisi rerum. Optio laudantium aspernatur excepturi vero consectetur vel id dolor voluptatem in iure? Laudantium non ducimus ullam obcaecati labore autem ab explicabo consequatur corporis? Odio molestiae eligendi sapiente molestias modi voluptatibus quibusdam aspernatur ad tempora perspiciatis, saepe beatae quidem. Temporibus doloribus accusamus a sequi eveniet quaerat culpa error debitis asperiores, beatae sunt officiis minus deserunt voluptatum! Adipisci doloribus voluptatum numquam itaque natus soluta dolore, ratione qui, nostrum eligendi reiciendis sed excepturi nam quos, animi ad eaque! Molestias temporibus obcaecati iure vel molestiae sit earum iusto, sunt officia repudiandae repellat illo eos? Possimus, inventore. Assumenda ab mollitia culpa et amet rerum suscipit provident ullam asperiores, voluptatibus molestiae officiis corporis recusandae facere, dolore facilis impedit debitis illo eius similique? Distinctio ad aliquam vitae nemo quisquam quo fugiat.</p>
      </div>
    </section>
  );
};

export default memo(Skills);

