/*
 * movement.c
 *
 *  Created on: Jan 30, 2024
 *      Author: joshs1
 */

//#include "open_interface.c"
#include "open_interface.h"
#include <string.h>
#include "uart-interrupt.h"
#include "cliff.h"
#include "cyBot_Scan.h"



//Moves 1 block forward
//called when the interrupt is triggered
double move_blockForward(oi_t *sensor_data, double distance)
{
    double block_length = distance;
    double block = 0; // distance member in oi_t struct is type double
    int hazardDetect = 0;
    int detectbump = 0;


    //Right Value is the left wheel // CYBOT 04
    oi_setWheels(201,200); //move forward at full speed //201, 200  || 300, 300 || 300, 299

          while (block < block_length) {
               hazardDetect = getCliffValues(sensor_data);
               detectbump = getifBump(sensor_data);


               if(detectbump == 1)
               {
                   return 712;
               }
               if(hazardDetect == 1)
               {
                   oi_setWheels(0,0);

                   uart_sendStr("\n\rYou Hit A PotHole or the Boundary Turn Around\n\r");

                   return block;
               }

               oi_update(sensor_data);
               block += sensor_data -> distance; // use -> notation since pointer

               lcd_printf("Speed: 25 MPH");
           }



     oi_setWheels(0,0);




     return 0;
}

//double move_intersection(oi_t *sensor_data, double distance){
//    double block_length = distance;
//
//    double block = 0; // distance member in oi_t struct is type double
//        oi_setWheels(40,40); //move forward at full speed
//
//               while (block < block_length) {
//                   oi_update(sensor_data);
//                   block += sensor_data -> distance; // use -> notation since pointer
//
//                   char buf[128];
//                   sprintf(buf, "%f", block);
//
//                   lcd_printf("Speed: 25 MPH");
//
//
//               }
//
//         oi_setWheels(0,0);
//         return 0;
//
//}

void potHole(oi_t *sensor_data, double backDist)
{

double block_length = backDist - 10.0;
double block = 0; // distance member in oi_t struct is type double


    oi_setWheels(100,100); //move forward at full speed

          while (block < block_length) {

               oi_update(sensor_data);
               block += sensor_data -> distance; // use -> notation since pointer

               lcd_printf("Speed: 25 MPH");
           }
     oi_setWheels(0,0);

}


double move_uTurn(oi_t *sensor_data)
{
    double block_length = 590.0;
    double block = 0; // distance member in oi_t struct is type double
    oi_setWheels(200,200); //move forward at full speed

           while (block < block_length) {
               oi_update(sensor_data);
               block += sensor_data -> distance; // use -> notation since pointer

               char buf[128];
               sprintf(buf, "%f", block);

               lcd_printf(buf);


           }
     return 0;
}


double turn_right(oi_t *sensor, double degrees)
{
    double sum = 0;
    oi_setWheels(-40,40);

    while(sum > (degrees*-1))
    {
        oi_update(sensor);
        sum += sensor->angle;
    }
    oi_setWheels(0,0);



    return 0;
}

double turn_left(oi_t *sensor, double degrees)
{

    double sum = 0;
        oi_setWheels(40,-40);

        while(sum < degrees)
        {
            oi_update(sensor);
            sum += sensor->angle;
        }
        oi_setWheels(0,0);



        return 0;
}

































//This is the function for turning when cyBot
//is in the middle of the intersection


//This is the function for turning when cyBot
//is in the middle of the intersection

double uturn(oi_t *sensor, double degrees)
{

    double sum = 0;
        oi_setWheels(500,0);

        while(sum < 80)
        {
            oi_update(sensor);
            sum += sensor->angle;
        }
        oi_setWheels(0,0);



        return 0;
}



//double collision_setection(oi_t *sensor, double distance_mm)
//{
//    double sum = 0;
//
//    while(sum < distance_mm)
//    {
//        oi_update(sensor);
//        sum += sensor->distance;
//        oi_setWheels(500,500);
//        if(sensor->bumpLeft == 1)
//        {
//            oi_setWheels(0,0);
//            move_back(sensor, 150.0);
//            turn_right(sensor, 90);
//            move_forward (sensor, 250.0);
//            turn_left(sensor, 90);
//            sum -= 150.0;
//        }
//        else if(sensor->bumpRight == 1)
//        {
//            oi_setWheels(0,0);
//            move_back(sensor, 150.0);
//            turn_left(sensor, 90);
//            move_forward (sensor, 250.0);
//            turn_right(sensor, 90);
//            sum -= 150.0;
//        }
//
//
//
//    }
//}


