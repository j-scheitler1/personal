/// Simple 'Hello, world' program
/**
 * This program prints "Hello, world" to the LCD screen
 * @author Chad Nelson
 * @date 06/26/2012
 *
 * updated: phjones 9/3/2019
 * Description: Added timer_init call, and including Timer.h
 */

#include "Timer.h"
#include "lcd.h"
#include "open_interface.h"
#include "uart-interrupt.h"
#include "movement.h"
#include "servo.h"
#include "adc.h"
#include "ping.h"
#include "cliff.h"
//#include "cyBot_Scan.h"

unsigned char horn = 'a';
unsigned char victorySong = 'abcdefasgsaa';

int main (void) {
    
    int destinationRow = 6;
    int destinationCol = 3;
    int currRow = 0;
    int currCol = 0;
    int uart_triggered = 1;
    int j = 0;
    int madeToDelivery = 1;
    int please = 1;

    char DC;
    char DR;
    char CR;
    char CC;
    char direction = 'N';
    char Instructions;

    oi_t *sensor_data = oi_alloc(); // do this only once at start of main()
    oi_init(sensor_data); // do this only once at start of main()
//  oi_free(sensor_data);
    innit();

    uart_sendChar('\n');
    uart_sendChar('\r');
    uart_sendStr("Please enter destination row: ");
    DR = uart_receive();
    timer_waitMillis(300);
    destinationRow = DR - '0';
    uart_sendChar('\n');
    uart_sendChar('\r');

    uart_sendChar('\n');
    uart_sendChar('\r');
    uart_sendStr("Please enter destination column: ");
    DC = uart_receive();
    timer_waitMillis(300);
    destinationCol = DC - '0';
    uart_sendChar('\n');
    uart_sendChar('\r');

    uart_sendChar('\n');
    uart_sendChar('\r');
    uart_sendStr("Please Starting row: ");
    CR = uart_receive();
    timer_waitMillis(300);
    currRow = CR - '0';
    uart_sendChar('\n');
    uart_sendChar('\r');

    uart_sendChar('\n');
    uart_sendChar('\r');
    uart_sendStr("Please Starting Col: ");
    CC = uart_receive();
    timer_waitMillis(300);
    currCol = CC - '0';
    uart_sendChar('\n');
    uart_sendChar('\r');

        while(madeToDelivery){
        char R[5] = "";
        char C[5] = "";
        double hitsomething = 0;

        Instructions = uart_receive(); //Takes in instructions from puTTy

        if(Instructions == 'w') //forward
        {
            uart_sendStr("\n\rYou Are Driving Forward\n\r");
            timer_waitMillis(200);
            hitsomething = move_blockForward(sensor_data, 580);
            if(hitsomething == 712)
            {
                uart_sendStr("\n\rYou Won\n\r");
                timer_waitMillis(200);
                turn_left(sensor_data, 180.0);
                turn_left(sensor_data, 180.0);
                turn_left(sensor_data, 180.0);
                oi_play_song(2);
                madeToDelivery = 0;
                break;

            }
            if(hitsomething > 0.0 && hitsomething != 712)
            {
                timer_waitMillis(200);
                turn_left(sensor_data, 180);
                move_blockForward(sensor_data, hitsomething);
                switch(direction){
                case 'N':
                    direction = 'S';

                    break;
                case 'S':
                    direction = 'N';

                    break;
                case 'W':
                    direction = 'E';

                    break;
                case 'E':
                    direction = 'W';

                    break;
                }
                please = 0;
            }

          if(please == 1)
          {

            switch(direction){
            case 'N':
                currCol++;
                break;
            case 'S':
                currCol--;
                break;
            case 'W':
                currRow--;
                break;
            case 'E':
                currRow++;
                break;
            }
          }
          please = 1;
            uart_sendStr("\n\rYou Are Done\n\r");

            sprintf(R, "%d", currRow);
            sprintf(C, "%d", currCol);
            uart_sendStr(R);
            uart_sendStr(C);
            uart_sendStr("\n\r");
            uart_sendChar(direction);
            uart_sendStr("\r\n");

        }

        else if(Instructions == 'a') // left
        {
            uart_sendStr("\n\rYou Are Driving Left\n\r");
            turn_left(sensor_data, 87.0);
            switch(direction){
                case 'N':
                    direction = 'W';

                    break;
                case 'S':
                    direction = 'E';

                    break;
                case 'W':
                    direction = 'S';

                    break;
                case 'E':
                    direction = 'N';

                    break;
            }

//            timer_waitMillis(200);
//            turn_left(sensor_data, 1);
            uart_sendStr("You Are Done\n\r");
            sprintf(R, "%d", currRow);
            sprintf(C, "%d", currCol);
            uart_sendStr(R);
            uart_sendStr(C);
            uart_sendStr("\n\r");
            uart_sendChar(direction);
            uart_sendStr("\r\n");
        }

        else if(Instructions == 'd') //right
        {
            uart_sendStr("\n\rYou Are Driving Right\n\r");
            turn_right(sensor_data, 90); // 87

            switch(direction){
            case 'N':
                direction = 'E';

                break;
            case 'S':
                direction = 'W';

                break;
            case 'W':
                direction = 'N';

                break;
            case 'E':
                direction = 'S';

                break;
            }

            timer_waitMillis(200);
            uart_sendStr("You Are Done\n\r");
            sprintf(R, "%d", currRow);
            sprintf(C, "%d", currCol);
            uart_sendStr(R);
            uart_sendStr(C);
            uart_sendStr("\n\r");
            uart_sendChar(direction);
            uart_sendStr("\r\n");
        }
        else if(Instructions == 's') // U - Turn
        {
            uart_sendStr("\n\rYou Are Driving Backwards\n\r");

            turn_left(sensor_data, 180);
            hitsomething = move_blockForward(sensor_data, 235);

            if(hitsomething == 712)
            {
                timer_waitMillis(200);
                turn_left(sensor_data, 180.0);
                turn_left(sensor_data, 180.0);
                turn_left(sensor_data, 180.0);
                oi_play_song(2);

            }
            if(hitsomething > 0.0)
            {
                timer_waitMillis(200);
                turn_left(sensor_data, 190.0);
                potHole(sensor_data, hitsomething);



            }
            switch(direction){
            case 'N':
                direction = 'S';
                currCol--;
                break;
            case 'S':
                direction = 'N';
                currCol++;
                break;
            case 'W':
                direction = 'E';
                currRow++;
                break;
            case 'E':
                direction = 'W';
                currRow--;
                break;
            }

            uart_sendStr("You Are Done\n\r");
            sprintf(R, "%d", currRow);
            sprintf(C, "%d", currCol);
            uart_sendStr(R);
            uart_sendStr(C);
            uart_sendStr("\n\r");
        }

        else if(Instructions == 'm'){
            uart_sendStr("You Are Scanning\n\r");
            timer_waitMillis(200);
            scan_intersection();
            uart_sendStr("\n\rYou Are Done scanning\n\r");
        }
        else if(Instructions == 'l'){
                    uart_sendStr("You Are Quick Scanning\n\r");
                    timer_waitMillis(200);
                    quick_scan();
                    uart_sendStr("\n\rYou Are Done scanning\n\r");
                }
        else if(Instructions == 'n'){ //Horn
            oi_play_song(1);
        }
        else if(Instructions == 'b'){ //Victory Song
            oi_play_song(2);
        }
        else if(Instructions == 'q'){ //Break
            break;
        }

    }


    oi_free(sensor_data); // do this once at end of main()
	return 0;
}



//This funtion scans to find objects in the intersection


void scan_intersection(void)
{

    int i = 0;
    char left = 'L';
    char middle = 'M';
    char right = 'R';

    int rightCount = 0;
    int middleCount = 0;
    int leftCount = 0;


    float adc_distance;
    float ping_distance;

    for(i = 20; i < 140; i+=2)
    {
        char objDirection[2] = "";
        servo_move(i);
        send_pulse();
        adc_distance = adc_dist();
        ping_distance = ping_read();

        if(adc_distance < 75 && ping_distance < 200)
        {
            if(i < 60 && rightCount < 6 && ping_distance < 100 && adc_distance < 50)
            {
                strncat(objDirection, &right, 1);
                uart_sendStr(objDirection);
                rightCount++;
            }
            else if(i > 60 && i < 119 && middleCount < 6)
            {
                strncat(objDirection, &middle, 1);
                uart_sendStr(objDirection);
                middleCount++;
            }
            else if(i >= 120 && leftCount < 6 &&  ping_distance < 100 && adc_distance < 50)
            {
                strncat(objDirection, &left, 1);
                uart_sendStr(objDirection);
                leftCount++;
            }
        }
    }
}

void quick_scan(void)
{

    int i = 0;
    char left = 'L';
    char middle = 'M';
    char right = 'R';

    int rightCount = 0;
    int middleCount = 0;
    int leftCount = 0;


    float adc_distance;
    float ping_distance;

    for(i = 75; i < 105; i+=2)
    {
        char objDirection[2] = "";
        servo_move(i);
        send_pulse();
        adc_distance = adc_dist();
        ping_distance = ping_read();

        if(adc_distance < 75 && ping_distance < 200)
        {
            if(i < 60 && rightCount < 6 && ping_distance < 100 && adc_distance < 50)
            {
                strncat(objDirection, &right, 1);
                uart_sendStr(objDirection);
                rightCount++;
            }
            else if(i > 60 && i < 119 && middleCount < 6)
            {
                strncat(objDirection, &middle, 1);
                uart_sendStr(objDirection);
                middleCount++;
            }
            else if(i >= 120 && leftCount < 6 &&  ping_distance < 100 && adc_distance < 50)
            {
                strncat(objDirection, &left, 1);
                uart_sendStr(objDirection);
                leftCount++;
            }
        }
    }
}




//void cliffColorDetect()
//{
//
//}



//
// This Function Initializes all
//
//
void innit(void)
{
    timer_init();
    lcd_init();
    uart_interrupt_init();
    adc_init();
    ping_init();
    servo_init();
    oi_loadSong(1, 1, horn, 150);
    oi_loadSong(2, 12, victorySong, 500);

}

